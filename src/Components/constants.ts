import { AuthTypes } from "../Context/AuthTypes";

export const initAuth: AuthTypes = {
  username: "",
  pwd: "",
  roles: [],
  accessToken: "",
};

export const LOGIN_URL = "/login";
export const REGISTER_URL = "/register";
export const DASHBOARD_URL = "/dashboard";
