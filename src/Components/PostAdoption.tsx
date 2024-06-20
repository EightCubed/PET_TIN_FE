// src/components/PostAdoption.jsx
import React, { useEffect, useState } from "react";
import Header from "./Header";
import styles from "./postadoption.module.css";
import classNames from "classnames/bind";
import { Fetch } from "../utility Functions/fetch_utilites";
import { useAuth } from "../context/AuthProvider";
import Loader from "./Loader";
import { Fetch_Location_List } from "../utility Functions/fetch_countries";

const cx = classNames.bind(styles);

interface PetDetails {
  petName: string;
  petAge: string;
  petGender: string;
  petSpecies: string;
  petBreed: string;
  description: string;
}

interface LocationDetails {
  city: string;
  state: string;
  country: string;
}

const initPetDetails: PetDetails = {
  petName: "pet123",
  petAge: "12",
  petGender: "male",
  petSpecies: "dog",
  petBreed: "labrador",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
};

const initLocationDetails: LocationDetails = {
  city: "",
  state: "",
  country: "",
};

interface UserData {
  firstName: string;
  lastName: string;
  age: string;
  gender: string;
}

const initUserData: UserData = {
  firstName: "",
  lastName: "",
  age: "",
  gender: "",
};

// type ImageState = File | Blob | string | null;

const PostAdoption = () => {
  const { auth } = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<UserData>(initUserData);
  const [petDetails, setPetDetails] = useState<PetDetails>(initPetDetails);
  const [petLocationDetails, setPetLocationDetails] =
    useState<LocationDetails>(initLocationDetails);
  const [image, setImage] = useState<string[] | null>(null);
  const [file, setFile] = useState<File[] | null>(null);

  const fetchUser = async () => {
    try {
      const response = await Fetch<UserData>({
        method: "get",
        apiRoutes: "getUser",
        bearerToken: auth.accessToken,
        id: auth._id,
      });
      setUserData(response);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    if (selectedFiles) {
      const selectedFiles = Array.from(event.target.files || []);
      setFile(selectedFiles);
      const imageUrls = selectedFiles.map((file) => URL.createObjectURL(file));
      setImage(imageUrls);
    }
  };

  const handleChange = (name: string, value: string) => {
    setPetDetails({
      ...petDetails,
      [name]: value,
    });
  };

  const handleLocationChange = (name: string, value: string) => {
    setPetLocationDetails({
      ...petLocationDetails,
      [name]: value,
    });
  };

  const fetchCountryData = async () => {
    const resp = await Fetch_Location_List();
    return resp.map((r) => r.name.official);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    fetchCountryData();
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await Fetch({
        method: "put",
        apiRoutes: "addPet",
        data: {
          userId: auth._id,
          petDetails,
          petLocationDetails,
          file,
        },
        bearerToken: auth.accessToken,
      });
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  const { petName, petAge, petBreed, petGender, petSpecies } = petDetails;

  console.log(file, userData);

  return (
    <div>
      {isLoading && <Loader />}
      <Header />
      <div className={cx("postAdoptionContainer")}>
        <div className={cx("postAdoptionTitle")}>Post for adoption</div>
        <div>
          <div className={cx("userDetails")}>
            <div className={cx("petDetailsTitle")}>User Details</div>
            <div className={cx("userDetailsInputs")}>
              <div>
                <div className={cx("textStyle")}>First Name</div>
                <input
                  value={userData.firstName}
                  className={cx("inputFieldDisabled", "disabled")}
                  disabled
                />
              </div>
              <div>
                <div className={cx("textStyle")}>Last Name</div>
                <input
                  value={userData.lastName}
                  className={cx("inputFieldDisabled", "disabled")}
                  disabled
                />
              </div>
              <div>
                <div className={cx("textStyle")}>Age</div>
                <input
                  value={userData.age}
                  className={cx("inputFieldDisabled", "disabled")}
                  disabled
                />
              </div>
              <div>
                <div className={cx("textStyle")}>Gender</div>
                <input
                  value={userData.gender}
                  className={cx("inputFieldDisabled", "disabled")}
                  disabled
                />
              </div>
            </div>
          </div>
          <div className={cx("petDetails")}>
            <div className={cx("petDetailsTitle")}>Pet Details</div>
            <div className={cx("petDetailsInputs")}>
              <div>
                <div>Pet Name</div>
                <input
                  value={petName}
                  name="petName"
                  onChange={({ target: { name, value } }) =>
                    handleChange(name, value)
                  }
                  className={cx("inputField")}
                />
              </div>
              <div>
                <div>Pet Age</div>
                <input
                  value={petAge}
                  name="petAge"
                  type="number"
                  step="0.1"
                  max={35}
                  onChange={({ target: { name, value } }) =>
                    handleChange(name, value)
                  }
                  className={cx("inputField")}
                />
              </div>
              <div>
                <div>Pet Gender</div>
                <input
                  value={petGender}
                  name="petGender"
                  onChange={({ target: { name, value } }) =>
                    handleChange(name, value)
                  }
                  className={cx("inputField")}
                />
              </div>
              <div>
                <div>Pet Species</div>
                <input
                  value={petSpecies}
                  name="petSpecies"
                  onChange={({ target: { name, value } }) =>
                    handleChange(name, value)
                  }
                  className={cx("inputField")}
                />
              </div>
              <div>
                <div>Pet Breed</div>
                <input
                  value={petBreed}
                  name="petBreed"
                  onChange={({ target: { name, value } }) =>
                    handleChange(name, value)
                  }
                  className={cx("inputField")}
                />
              </div>
            </div>
          </div>
          <div className={cx("petImageDetails")}>
            <div className={cx("petDetailsTitle")}>Pet Images</div>
            <input
              type="file"
              name="myImage"
              multiple
              onChange={handleImageChange}
            />
            {image &&
              image.length > 0 &&
              image.map((img) => {
                return <img src={img} width={250} height={250} />;
              })}
          </div>
          <div className={cx("petLocationDetails")}>
            <div className={cx("petDetailsTitle")}>Location Details</div>
            <div className={cx("petLocationDetailsInputs")}>
              <div>
                <div>Country</div>
                <input
                  value={petLocationDetails.country}
                  name="country"
                  onChange={({ target: { name, value } }) =>
                    handleLocationChange(name, value)
                  }
                  className={cx("inputField")}
                />
              </div>
              <div>
                <div>State</div>
                <input
                  value={petLocationDetails.state}
                  name="state"
                  type="number"
                  step="0.1"
                  max={35}
                  onChange={({ target: { name, value } }) =>
                    handleLocationChange(name, value)
                  }
                  className={cx("inputField")}
                />
              </div>
              <div>
                <div>City</div>
                <input
                  value={petLocationDetails.city}
                  name="city"
                  onChange={({ target: { name, value } }) =>
                    handleLocationChange(name, value)
                  }
                  className={cx("inputField")}
                />
              </div>
            </div>
          </div>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
};
// ULtOmq8sxM71GbJAsYq2FXJTFRM3bLqojeKyybVgc1kY7URj1E_hAsrPUAYJ_d4P1sM
export default PostAdoption;
