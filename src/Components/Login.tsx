import React, { useState } from "react";
import { Fetch } from "../Utility Functions/fetch_utilites";
import { LoginPostData, LoginPostResponseData } from "./login.types";
import { useAuth } from "../Context/AuthProvider";
import { Button, Form } from "react-bootstrap";
import styles from "./login.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const initFormData: LoginPostData = {
  username: "",
  password: "",
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await Fetch<LoginPostResponseData>({
      method: "post",
      apiRoutes: "login",
      data: {
        user: "admin",
        pwd: "admin",
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
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Form.Group>
          <Form.Label>Login</Form.Label>
        </Form.Group>
        <Form.Group>
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={formData.username}
            onChange={({ target: { name, value } }) =>
              handleChange(name, value)
            }
          />
          <div>
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={({ target: { name, value } }) =>
                handleChange(name, value)
              }
            />
          </div>
        </Form.Group>
        <Form.Group>
          <Button variant="dark" type="submit">
            Sign in
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default LoginForm;
