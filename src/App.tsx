import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "./context/AuthProvider";
import useRefreshToken from "./hooks/useRefreshToken";
import Loader from "./components/Reusable Components/Loader";
import {
  DASHBOARD_URL,
  FAQ_URL,
  HELP_URL,
  LIKEDPETS_URL,
  LOGIN_URL,
  MYACCOUNT_URL,
  MYPETS_URL,
  PETVIEW_URL,
  POSTADOPTION_URL,
  PROFILE_URL,
  REGISTER_URL,
} from "./components/constants";
import Login from "./components/Login & Register/Login";
import RegisterForm from "./components/Login & Register/Register";
import Help from "./components/Help/Help";
import Faq from "./components/FAQ/Faq";
import IndividualPetView from "./components/Reusable Components/IndividualPetView";
import LikedPets from "./components/Liked Pets/LikedPets";
import NotFoundPage from "./components/Not Found Page/NotFoundPage";
import PostAdoption from "./components/Post Adoption/PostAdoption";
import GetUser from "./components/Reusable Components/GetUser";
import MyAccount from "./components/My Account/MyAccount";
import MyPets from "./components/My Pets/MyPets";

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
        <Route path="/" element={<Navigate to={DASHBOARD_URL} />} />
        <Route path={REGISTER_URL} element={<RegisterForm />}></Route>
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
          path={HELP_URL}
          element={!isAuthenticated ? <Navigate to={LOGIN_URL} /> : <Help />}
        />
        <Route
          path={FAQ_URL}
          element={!isAuthenticated ? <Navigate to={LOGIN_URL} /> : <Faq />}
        />
        <Route
          path={PETVIEW_URL}
          element={
            !isAuthenticated ? (
              <Navigate to={LOGIN_URL} />
            ) : (
              <IndividualPetView />
            )
          }
        />
        <Route
          path={LIKEDPETS_URL}
          element={
            !isAuthenticated ? <Navigate to={LOGIN_URL} /> : <LikedPets />
          }
        />
        <Route
          path={POSTADOPTION_URL}
          element={
            !isAuthenticated ? <Navigate to={LOGIN_URL} /> : <PostAdoption />
          }
        />
        <Route
          path={PROFILE_URL}
          element={!isAuthenticated ? <Navigate to={LOGIN_URL} /> : <GetUser />}
        />
        <Route
          path={MYACCOUNT_URL}
          element={
            !isAuthenticated ? <Navigate to={LOGIN_URL} /> : <MyAccount />
          }
        />
        <Route
          path={MYPETS_URL}
          element={!isAuthenticated ? <Navigate to={LOGIN_URL} /> : <MyPets />}
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
