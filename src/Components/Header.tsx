import classNames from "classnames/bind";
import styles from "./header.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { Fetch } from "../utility Functions/fetch_utilites";
import { initAuth, LOGIN_URL } from "./constants";
import icon from "../../public/pet_logo.png";

const cx = classNames.bind(styles);

const Header = () => {
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
    <div className={cx("headerContainer")}>
      <div className={cx("iconContainer")}>
        <img src={icon} className={cx("iconImage")} />
      </div>
      <div className={cx("homeButton")}>Home</div>
      <div className={cx("logoutButton")} onClick={handleClick}>
        Logout
      </div>
    </div>
  );
};

export default Header;
