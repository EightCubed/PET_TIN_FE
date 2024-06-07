import "./App.css";
import Login from "./Components/Login";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "./Context/AuthProvider";
import useRefreshToken from "./hooks/useRefreshToken";
import Loader from "./Components/Loader";
import { DASHBOARD_URL, LOGIN_URL } from "./Components/constants";

function App() {
  const { auth } = useAuth();
  const refresh = useRefreshToken();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkTokenExpired = (token: string) => {
      if (!token) return true;
      const { exp } = jwtDecode(token);
      if (!exp) return true;
      const expiryDate = new Date(exp * 1000);
      return expiryDate < new Date();
    };

    const verifyToken = async () => {
      const tokenExpired = checkTokenExpired(auth.accessToken);
      if (!tokenExpired) {
        setIsAuthenticated(true);
      } else {
        try {
          await refresh();
          setIsAuthenticated(true);
        } catch (error) {
          setIsAuthenticated(false);
        }
      }
      setTimeout(async () => {
        setLoading(false);
      }, 500); // 0.2 seconds delay
    };

    verifyToken();
  }, [auth.accessToken, refresh]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="App">
      <Routes>
        <Route
          path={LOGIN_URL}
          element={
            isAuthenticated ? <Navigate to={DASHBOARD_URL} /> : <Login />
          }
        />
        <Route
          path={DASHBOARD_URL}
          element={
            !isAuthenticated ? <Navigate to={LOGIN_URL} /> : <Dashboard />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
