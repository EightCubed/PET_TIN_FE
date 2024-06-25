import { useAuth } from "../context/AuthProvider";
import { Fetch } from "../utility Functions/fetch_utilites";
import { LoginPostResponseData } from "../components/Login & Register/login.types";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await Fetch<LoginPostResponseData>({
      method: "post",
      apiRoutes: "refreshToken",
    });
    setAuth((prev) => {
      return {
        ...prev,
        accessToken: response.accessToken,
        _id: response._id,
        username: response.username,
      };
    });
    return response.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
