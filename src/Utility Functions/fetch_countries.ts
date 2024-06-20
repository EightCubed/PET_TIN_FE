import axios from "axios";

const ATendpointURL = "https://www.universal-tutorial.com/api/getaccesstoken";
const endpointURL = "https://restcountries.com/v3.1/all";

interface CountryObject {
  name: {
    common: string;
    official: string;
  };
}

const formatEndpoint = (country: string, state: string) => {
  if (!country) return endpointURL + "/countries";
  if (!state) return endpointURL + country;
  return endpointURL + country + "/" + state;
};

const EMAIL = "netflix.rkn1@gmail.com";

export const Fetch_Location_List_AT = async () => {
  const response = await axios(ATendpointURL, {
    headers: {
      Accept: "application/json",
      "api-token": API_TOKEN,
      "user-email": EMAIL,
    },
    method: "get",
  });
  console.log(response);
};

export const Fetch_Location_List = async (country = "", state = "") => {
  try {
    const response = await axios(endpointURL, {
      method: "get",
    });
    return response.data as CountryObject[];
  } catch (err) {
    console.error(err);
    return [];
  }
};
