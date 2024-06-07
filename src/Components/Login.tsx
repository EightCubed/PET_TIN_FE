import React, { useState } from "react";
import { Fetch } from "../Utility Functions/fetch_utilites";
import { LoginPostData, LoginPostResponseData } from "./login.types";
import { useAuth } from "../Context/AuthProvider";
import styles from "./login.module.css";
import classNames from "classnames/bind";
import { Form } from "react-bootstrap";

const cx = classNames.bind(styles);

const initFormData: LoginPostData = {
  username: "",
  password: "",
  rememberMe: false,
};

const LoginForm = () => {
  const { setAuth } = useAuth();

  const [formData, setFormData] = useState(initFormData);

  const handleChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleChecked = () => {
    setFormData({
      ...formData,
      rememberMe: !formData.rememberMe,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await Fetch<LoginPostResponseData>({
      method: "post",
      apiRoutes: "login",
      data: {
        user: formData.username,
        pwd: formData.password,
        rememberMe: formData.rememberMe,
      },
    });
    setAuth({
      username: formData.username,
      pwd: formData.password,
      roles: response.roles,
      accessToken: response.accessToken,
    });
  };

  return (
    <div className={cx("loginContainer")}>
      <div className={cx("loginLeftContainer")}>
        <form className={cx("formContainer")} onSubmit={(e) => handleSubmit(e)}>
          <div className={cx("signInText")}>Sign In</div>
          <div className={cx("userNameBox")}>
            <div className={cx("userNameText")}>USERNAME</div>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={({ target: { name, value } }) =>
                handleChange(name, value)
              }
              size={30}
              className={cx("userNameInput")}
            />
          </div>
          <div className={cx("passwordNameBox")}>
            <div className={cx("passwordNameText")}>PASSWORD</div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={({ target: { name, value } }) =>
                handleChange(name, value)
              }
              size={30}
              className={cx("passwordNameInput")}
            />
          </div>
          <button className={cx("signInButton")} type="submit">
            Sign in
          </button>
          <div className={cx("lastRow")}>
            <div className={cx("checkboxContainer")}>
              <Form.Check
                type={"checkbox"}
                className={cx("checkBox")}
                checked={formData.rememberMe}
                onChange={handleChecked}
              />
              <div className={cx("checkBoxText")}>Remember me</div>
            </div>
            <div className={cx("forgotPassword")}>Forgot Password</div>
          </div>
        </form>
      </div>
      <div className={cx("loginRightContainer")}></div>
    </div>
  );
};

export default LoginForm;
