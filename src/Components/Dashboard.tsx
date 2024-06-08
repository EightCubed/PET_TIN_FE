import { Button } from "react-bootstrap";
import { Fetch } from "../Utility Functions/fetch_utilites";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { LOGIN_URL, initAuth } from "./constants";

const Dashboard = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const handleClick = async () => {
    try {
      await Fetch({
        method: "post",
        apiRoutes: "logout",
      });
      setAuth(initAuth);
      navigate(LOGIN_URL, { replace: true });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      Dashboard!
      <Button onClick={handleClick}>Logout</Button>
    </>
  );
};

export default Dashboard;
