import "./App.css";
import Login from "./components/Login";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "./context/AuthProvider";
import useRefreshToken from "./hooks/useRefreshToken";
import Loader from "./components/Loader";
import { DASHBOARD_URL, LOGIN_URL } from "./components/constants";
import RegisterForm from "./components/Register";

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
      }, 1); // 0.8 seconds delay
    };

    verifyToken();
  }, [auth.accessToken, refresh]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/register" element={<RegisterForm />}></Route>
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
