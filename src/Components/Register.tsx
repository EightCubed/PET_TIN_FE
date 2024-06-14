import React, { useCallback, useState } from "react";
import { Fetch } from "../utility Functions/fetch_utilites";
import { RegisterPostData, LoginPostResponseData } from "./login.types";
import styles from "./login.module.css";
import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import debounce from "../hooks/useDebounce";

const cx = classNames.bind(styles);

const initFormData: RegisterPostData = {
  username: "",
  password: "",
  emailId: "",
};

const initErrorFormData: RegisterPostData = {
  username: "",
  password: "",
  emailId: "",
};

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initFormData);
  const [error, setError] = useState(initErrorFormData);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetError = useCallback(debounce(setError, 700), [setError]); // 300ms delay

  const handleChange = (name: string, value: string) => {
    if (name === "emailId") {
      const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (value !== "") {
        if (!pattern.test(value)) {
          debouncedSetError((prevError) => ({
            ...prevError,
            emailId: "Email ID is not valid!",
          }));
        } else {
          debouncedSetError((prevError) => ({ ...prevError, emailId: "" }));
        }
      } else {
        debouncedSetError((prevError) => ({ ...prevError, emailId: "" }));
      }
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    Fetch<LoginPostResponseData>({
      method: "post",
      apiRoutes: "register",
      data: {
        user: formData.username,
        pwd: formData.password,
        emailId: formData.emailId,
      },
    })
      .then(() => {})
      .finally(() => {
        handleNavigateToRegisterPage();
      });
  };

  const handleNavigateToRegisterPage = () => {
    navigate("/login");
  };

  return (
    <div className={cx("loginContainer", "reverse")}>
      <div className={cx("loginLeftContainer")}>
        <form className={cx("formContainer")} onSubmit={(e) => handleSubmit(e)}>
          <div className={cx("signInText")}>Register</div>
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
          <div className={cx("emailIdBox")}>
            <div className={cx("userNameText")}>Email ID</div>
            <input
              type="text"
              name="emailId"
              value={formData.emailId}
              onChange={({ target: { name, value } }) =>
                handleChange(name, value)
              }
              size={30}
              className={cx("userNameInput")}
            />
            {error.emailId && (
              <div className={cx("errorText")}>
                <Alert variant="danger">{error.emailId}</Alert>
              </div>
            )}
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
            Register
          </button>
        </form>
      </div>
      <div className={cx("loginRightContainer")}>
        <div className={cx("loginRightText")}>
          <div className={cx("welcomeText")}>Already Registered?</div>
          <div className={cx("accountText")}>Click here!</div>
          <div className={cx("signUpButtonContainer")}>
            <button
              className={cx("signUpButton")}
              onClick={handleNavigateToRegisterPage}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
