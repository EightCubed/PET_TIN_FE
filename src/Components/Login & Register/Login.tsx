import React, { useState } from "react";
import { Fetch } from "../../utility Functions/fetch_utilites";
import { LoginPostData, LoginPostResponseData } from "./login.types";
import { useAuth } from "../../context/AuthProvider";
import styles from "./login.module.css";
import classNames from "classnames/bind";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { REGISTER_URL } from "../constants";
import toast, { Toaster } from "react-hot-toast";

const cx = classNames.bind(styles);

const initFormData: LoginPostData = {
  username: "",
  password: "",
  rememberMe: false,
};

const LoginForm = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

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

    try {
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
        _id: response._id,
      });
    } catch (err) {
      const error = err as Error;
      console.error(error.message);
      toast(error.message);
    }
  };

  const handleNavigateToRegisterPage = () => {
    navigate(REGISTER_URL);
  };

  return (
    <div className={cx("loginPage")}>
      <div className={cx("toastContainer")}>
        <div className={cx("errorTextLogin")}>
          <Toaster />
        </div>
      </div>
      <div className={cx("loginContainer")}>
        <div className={cx("loginLeftContainer")}>
          <form
            className={cx("formContainer")}
            onSubmit={(e) => handleSubmit(e)}
          >
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
              <div className={cx("checkboxContainer")} onClick={handleChecked}>
                <Form.Check
                  type={"checkbox"}
                  className={cx("checkBox")}
                  checked={formData.rememberMe}
                  onChange={() => {}}
                />
                <div className={cx("checkBoxText")}>Remember me</div>
              </div>
              <div className={cx("forgotPassword")}>Forgot Password</div>
            </div>
          </form>
        </div>
        <div className={cx("loginRightContainer")}>
          <div className={cx("loginRightText")}>
            <div className={cx("welcomeText")}>Welcome To Login</div>
            <div className={cx("accountText")}>Don't have an account?</div>
            <div className={cx("signUpButtonContainer")}>
              <button
                className={cx("signUpButton")}
                onClick={handleNavigateToRegisterPage}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
