import "./App.css";
import Login from "./Components/Login";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "./Context/AuthProvider";
import useRefreshToken from "./hooks/useRefreshToken";

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
      setLoading(false);
    };

    verifyToken();
  }, [auth.accessToken, refresh]);

  if (loading) {
    return <div>Loading...</div>; // Or a proper loading component
  }

  return (
    <div className="App">
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route
          path="/dashboard"
          element={!isAuthenticated ? <Navigate to="/login" /> : <Dashboard />}
        />
      </Routes>
    </div>
  );
}

export default App;
