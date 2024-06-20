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
import Help from "./components/Help";
import Faq from "./components/Faq";
import IndividualPetView from "./components/IndividualPetView";
import LikedPets from "./components/LikedPets";
import NotFoundPage from "./components/NotFoundPage";
import PostAdoption from "./components/PostAdoption";
import GetUser from "./components/GetUser";
import MyAccount from "./components/MyAccount";

function App() {
  const { auth } = useAuth();
  const refresh = useRefreshToken();
  const [isLoading, setIsLoading] = useState(true);
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
      setIsLoading(false);
    };

    verifyToken();
  }, [auth.accessToken, refresh]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
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
        <Route
          path={"/help"}
          element={!isAuthenticated ? <Navigate to={LOGIN_URL} /> : <Help />}
        />
        <Route
          path={"/FAQ"}
          element={!isAuthenticated ? <Navigate to={LOGIN_URL} /> : <Faq />}
        />
        <Route
          path={"/pet/:id"}
          element={
            !isAuthenticated ? (
              <Navigate to={LOGIN_URL} />
            ) : (
              <IndividualPetView />
            )
          }
        />
        <Route
          path={"/likedPets"}
          element={
            !isAuthenticated ? <Navigate to={LOGIN_URL} /> : <LikedPets />
          }
        />
        <Route
          path={"/postAdoption"}
          element={
            !isAuthenticated ? <Navigate to={LOGIN_URL} /> : <PostAdoption />
          }
        />
        <Route
          path={"/profile"}
          element={!isAuthenticated ? <Navigate to={LOGIN_URL} /> : <GetUser />}
        />
        <Route
          path={"/myAccount"}
          element={
            !isAuthenticated ? <Navigate to={LOGIN_URL} /> : <MyAccount />
          }
        />
        <Route
          path="*"
          element={
            !isAuthenticated ? <Navigate to={LOGIN_URL} /> : <NotFoundPage />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
