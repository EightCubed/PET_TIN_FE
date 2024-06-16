import classNames from "classnames/bind";
import styles from "./header.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { Fetch } from "../utility Functions/fetch_utilites";
import { DASHBOARD_URL, initAuth, LOGIN_URL } from "./constants";
import icon from "/pet_logo.png";
import { Avatar, MenuItem, MenuList } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import PetsIcon from "@mui/icons-material/Pets";

const cx = classNames.bind(styles);

interface PathLookupType {
  [key: string]: string;
}

const table: PathLookupType = {
  "/dashboard": "Home",
  "/help": "Help",
  "/FAQ": "FAQ",
};

const returnSelected = (headerTitle: string) => {
  const path = window.location.pathname;
  if (table[path] === headerTitle) return "selected";
  return "";
};

const Header = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const [isDropDownSelected, setIsDropDownSelected] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropDownSelected(false);
    }
  };

  const handleDropDownClick = () => {
    setIsDropDownSelected(!isDropDownSelected);
  };

  useEffect(() => {
    if (isDropDownSelected) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropDownSelected]);

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
    <div className={cx("headerContainer", "no-select")}>
      <div className={cx("iconContainer")}>
        <img src={icon} className={cx("iconImage")} />
      </div>
      <div className={cx("leftIcons")}>
        <div
          className={cx("homeButton", returnSelected("Home"))}
          onClick={() => navigate(DASHBOARD_URL)}
        >
          Home
        </div>
        <div
          className={cx("FAQButton", returnSelected("FAQ"))}
          onClick={() => navigate("/FAQ")}
        >
          FAQ
        </div>
        <div
          className={cx("FAQButton", returnSelected("Help"))}
          onClick={() => navigate("/help")}
        >
          Help
        </div>
      </div>
      <div className={cx("rightIcons")}>
        <div className={cx("likedPets", returnSelected("likedPets"))}>
          <div className={cx("pawIcon")}>
            <PetsIcon />
          </div>
          Liked Pets
        </div>
        <div className={cx("profileButton")} onClick={handleDropDownClick}>
          <Avatar
            alt="Remy Sharp"
            src="/static/images/avatar/1.jpg"
            sx={{ width: 30, height: 30 }}
          />
          <div className={cx("profileName")}>Profile</div>
        </div>
        {isDropDownSelected && (
          <div ref={dropdownRef} className={cx("dropdownContainer")}>
            <MenuList>
              <MenuItem>Profile</MenuItem>
              <MenuItem>My account</MenuItem>
              <MenuItem onClick={handleClick}>Logout</MenuItem>
            </MenuList>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
