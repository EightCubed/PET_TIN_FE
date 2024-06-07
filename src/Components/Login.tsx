import React, { useState } from "react";
import { Fetch } from "../Utility Functions/fetch_utilites";
import { LoginPostData, LoginPostResponseData } from "./login.types";
import { useAuth } from "../Context/AuthProvider";
import useRefreshToken from "../hooks/useRefreshToken";

const LoginForm = () => {
  const { setAuth } = useAuth();
  const refresh = useRefreshToken();

  const [formData, setFormData] = useState<LoginPostData>({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const test = async (temp: string) => {
    const response1 = await Fetch<LoginPostResponseData>({
      method: "get",
      apiRoutes: "listPets",
      bearerToken: temp,
    });
    console.log(response1);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
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
    test(response.accessToken);
  };

  const handleRefresh = async () => {
    await refresh();
  };

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <button type="submit">Sign in</button>
      </form>
      <button onClick={handleRefresh}>Refresh</button>
    </>
  );
};

export default LoginForm;
