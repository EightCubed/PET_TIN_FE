import { AuthTypes } from "../context/AuthTypes";
import { PetListDataType, PetListType } from "./types";

export const initAuth: AuthTypes = {
  username: "",
  pwd: "",
  roles: [],
  accessToken: "",
  _id: "",
};

export const initPetData: PetListDataType = {
  id: "",
  PetName: "",
  Age: "",
  Gender: "",
  OwnerDetails: "",
  Location: {
    City: "",
    State: "",
    Country: "",
  },
  ImageUrl: "",
  Species: "",
  Breed: "",
  _id: "",
  isLikedByUser: false,
  numberOfLikes: 0,
  Description: "",
};

export const initPetListData: PetListType = {
  data: [initPetData],
};

export const LOGIN_URL = "/login";
export const REGISTER_URL = "/register";
export const DASHBOARD_URL = "/dashboard";
