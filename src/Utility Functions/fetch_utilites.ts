import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

type ApiRoutes =
  | "addPet"
  | "listPets"
  | "login"
  | "logout"
  | "register"
  | "refreshToken";

export const BACKEND_URL = "https://localhost:443/api/";

type MethodType = "put" | "post" | "get" | "patch";

const protectedRoutes: ApiRoutes[] = ["addPet", "listPets"];

interface FetchType {
  method: MethodType;
  apiRoutes: ApiRoutes;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: Record<string, any>;
  bearerToken?: string;
}

export async function Fetch<T>({
  method,
  apiRoutes,
  data = {},
  bearerToken,
}: FetchType): Promise<T> {
  try {
    let args: AxiosRequestConfig = {
      method,
      url: BACKEND_URL + apiRoutes,
      withCredentials: true,
    };
    if (Object.entries(data).length !== 0) {
      args = {
        ...args,
        data,
      };
    }
    if (protectedRoutes.includes(apiRoutes)) {
      args = {
        ...args,
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      };
    }
    const response: AxiosResponse<T> = await axios(args);
    return response.data;
  } catch (error) {
    throw new Error(`Error making ${method} request : ${error}`);
  }
}
