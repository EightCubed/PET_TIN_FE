import axios from "axios";
import { useAuth } from "../Context/AuthProvider";
import { BACKEND_URL } from "../Utility Functions/fetch_utilites";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.post(BACKEND_URL + "refreshToken", null, {
      withCredentials: true,
    });
    setAuth((prev) => {
      console.log(JSON.stringify(prev));
      console.log(response.data.accessToken);
      return { ...prev, accessToken: response.data.accessToken };
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
