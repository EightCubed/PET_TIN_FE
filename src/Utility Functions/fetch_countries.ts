import axios from "axios";

const endpointURL = "https://localhost:443/api/fetchLocationData";

export const FETCH_LOCATION_LIST = async (country = "", state = "") => {
  try {
    let params;
    if (country) {
      params = {
        country,
      };
      if (state) {
        params = { ...params, state };
      }
    }
    const response = await axios(endpointURL, {
      method: "get",
      params,
    });
    return response.data;
  } catch (err) {
    console.error(err);
    return [];
  }
};
