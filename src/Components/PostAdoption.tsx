// src/components/PostAdoption.jsx
import React, { useEffect, useState } from "react";
import Header from "./Header";
import styles from "./postadoption.module.css";
import classNames from "classnames/bind";
import { Fetch } from "../utility Functions/fetch_utilites";
import { useAuth } from "../context/AuthProvider";
import Loader from "./Loader";
import AsyncInput from "./AsyncInput";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

interface PetDetails {
  petName: string;
  petAge: string;
  petGender: string;
  petSpecies: string;
  petBreed: string;
  description: string;
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

export interface OptsValue {
  id: string;
  name: string;
}

const initOptsValue: OptsValue = {
  id: "",
  name: "",
};

const PostAdoption = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<UserData>(initUserData);
  const [petDetails, setPetDetails] = useState<PetDetails>(initPetDetails);
  const [image, setImage] = useState<string[] | null>(null);
  const [file, setFile] = useState<File[] | null>(null);

  const [selectedCountry, setSelectedCountry] =
    useState<OptsValue>(initOptsValue);
  const [selectedState, setSelectedState] = useState<OptsValue>(initOptsValue);
  const [selectedCity, setSelectedCity] = useState<OptsValue>(initOptsValue);

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
      if (selectedFiles.length > 5) {
        console.error("Too many files");
        return;
      }
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

  useEffect(() => {
    fetchUser();
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await Fetch({
        method: "put",
        apiRoutes: "addPet",
        data: {
          userId: auth._id,
          petDetails,
          petLocationDetails: {
            city: selectedCity,
            state: selectedState,
            country: selectedCountry,
          },
          file,
        },
        bearerToken: auth.accessToken,
      });
      console.log(response);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  const { petName, petAge, petBreed, petGender, petSpecies } = petDetails;

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
            <div className={cx("fileInputContainerStyle")}>
              <input
                type="file"
                name="myImage"
                multiple
                onChange={handleImageChange}
                className={cx("fileInputStyle")}
              />
            </div>
            <div className={cx("uploadedImageContainer")}>
              {image &&
                image.length > 0 &&
                image.map((img) => {
                  return (
                    <img
                      src={img}
                      width={125}
                      height={125}
                      className={cx("uploadedImage")}
                    />
                  );
                })}
            </div>
          </div>
          <div className={cx("petLocationDetails")}>
            <div className={cx("petDetailsTitle")}>Location Details</div>
            <div className={cx("petLocationDetailsInputs")}>
              <div>
                <div>Country</div>
                <AsyncInput
                  type="country"
                  onChange={(value: OptsValue) => {
                    setSelectedCountry(value);
                    setSelectedState(initOptsValue); // Reset state when country changes
                    setSelectedCity(initOptsValue); // Reset city when country changes
                  }}
                />
              </div>
              <div>
                <div>State</div>
                <AsyncInput
                  type="state"
                  countryId={selectedCountry.id}
                  onChange={(value: OptsValue) => {
                    setSelectedState(value);
                    setSelectedCity(initOptsValue); // Reset city when state changes
                  }}
                />
              </div>
              <div>
                <div>City</div>
                <AsyncInput
                  type="city"
                  countryId={selectedCountry.id}
                  stateId={selectedState.id}
                  onChange={(value: OptsValue) => setSelectedCity(value)}
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

export default PostAdoption;
