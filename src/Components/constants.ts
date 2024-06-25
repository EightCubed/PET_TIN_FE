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
  OwnerDetails: {
    FirstName: "",
    LastName: "",
    Age: "",
    Gender: "",
  },
  Location: {
    City: "",
    State: "",
    Country: "",
  },
  ImageArray: [""],
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
export const PROFILE_URL = "/profile";
export const MYACCOUNT_URL = "/myAccount";
export const LIKEDPETS_URL = "/likedPets";
export const MYPETS_URL = "/myPets";
export const PETVIEW_URL = "/pet/:id";
export const POSTADOPTION_URL = "/postAdoption";
export const FAQ_URL = "/faq";
export const HELP_URL = "/help";
