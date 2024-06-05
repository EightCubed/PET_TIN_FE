import axios, { AxiosResponse } from "axios";

type ApiRoutes = "addPet" | "listPets";

const backendURL = "http://localhost:3000/api/";

type MethodType = "put" | "post" | "get" | "patch";

export async function Fetch<T>(
  method: MethodType,
  apiRoutes: ApiRoutes,
  data?: unknown
): Promise<T> {
  try {
    const response: AxiosResponse<T> = await axios({
      method,
      url: backendURL + apiRoutes,
      data,
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error making ${method} request : ${error}`);
  }
}
