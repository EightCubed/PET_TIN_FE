import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

type ApiRoutes =
  | "addPet"
  | "listPets"
  | "login"
  | "logout"
  | "register"
  | "refreshToken"
  | "likePet"
  | "getPet"
  | "getUser"
  | "addPetPictures"
  | "getLikedPets";

export const BACKEND_URL = "https://localhost:443/api/";

type MethodType = "put" | "post" | "get" | "patch";

const protectedRoutes: ApiRoutes[] = [
  "addPet",
  "listPets",
  "likePet",
  "getPet",
  "addPetPictures",
  "getLikedPets",
  "getUser",
];

interface FetchType {
  method: MethodType;
  apiRoutes: ApiRoutes;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: Record<string, any> | FormData;
  bearerToken?: string;
  id?: string;
  multipartFormData?: boolean;
}

export async function Fetch<T>({
  method,
  apiRoutes,
  data = {},
  bearerToken,
  id = "",
  multipartFormData = false,
}: FetchType): Promise<T> {
  try {
    const url = `${BACKEND_URL}${apiRoutes}${id ? `/${id}` : ""}`;
    const headers: Record<string, string> = {};

    if (protectedRoutes.includes(apiRoutes) && bearerToken) {
      headers["Authorization"] = `Bearer ${bearerToken}`;
    }

    const config: AxiosRequestConfig = {
      method,
      url,
      withCredentials: true,
      headers,
      data,
    };

    if (multipartFormData) {
      config.data = data;
    } else {
      headers["Content-Type"] = "application/json";
      config.data = JSON.stringify(data);
    }

    const response: AxiosResponse<T> = await axios(config);
    return response.data;
  } catch (error) {
    console.error("Error in Fetch:", error);
    throw error;
  }
}
