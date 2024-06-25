import { useEffect, useState } from "react";
import { Fetch } from "../../utility Functions/fetch_utilites";
import { useAuth } from "../../context/AuthProvider";
import Header from "./Header";
import styles from "./getuser.module.css";
import classNames from "classnames/bind";
import Loader from "./Loader";

const cx = classNames.bind(styles);

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

const verifyUserData = (userData: UserData) => {
  const { firstName, lastName, age, gender } = userData;
  return Boolean(firstName && lastName && age && gender);
};

const GetUser = () => {
  const { auth } = useAuth();

  const [userData, setUserData] = useState<UserData>(initUserData);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
      const isValid = verifyUserData(response);
      setIsDisabled(isValid);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleSetDisabledFalse = () => {
    setIsDisabled(false);
  };

  const updateUser = async () => {
    try {
      const response = await Fetch<UserData>({
        method: "patch",
        apiRoutes: "getUser",
        bearerToken: auth.accessToken,
        id: auth._id,
        data: userData,
      });
      setUserData(response);
      setIsDisabled(true);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.error(err);
    }
  };

  const handleSaveChanges = () => {
    setIsLoading(true);
    updateUser();
  };

  const handleChange = (name: string, value: string) => {
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  return (
    <>
      {isLoading && <Loader />}
      <Header />
      <div className={cx("profileContainer")}>
        <h1>Profile</h1>
        <div className={cx("profileEditContainer")}>
          <div className={cx("editProfileContainer")}>
            <button
              disabled={!isDisabled}
              onClick={handleSetDisabledFalse}
              className={cx("editProfileButton")}
            >
              Edit Profile
            </button>
          </div>
          <div className={cx("petDetailsInputs")}>
            <div>
              <div className={cx("textStyle")}>First Name</div>
              <input
                value={userData.firstName}
                disabled={isDisabled}
                name="firstName"
                onChange={({ target: { name, value } }) =>
                  handleChange(name, value)
                }
                className={cx("inputField")}
              />
            </div>
            <div>
              <div className={cx("textStyle")}>Last Name</div>
              <input
                value={userData.lastName}
                disabled={isDisabled}
                name="lastName"
                onChange={({ target: { name, value } }) =>
                  handleChange(name, value)
                }
                className={cx("inputField")}
              />
            </div>
            <div>
              <div className={cx("textStyle")}>Age</div>
              <input
                value={userData.age}
                disabled={isDisabled}
                name="age"
                onChange={({ target: { name, value } }) =>
                  handleChange(name, value)
                }
                className={cx("inputField")}
              />
            </div>
            <div>
              <div className={cx("textStyle")}>Gender</div>
              <input
                value={userData.gender}
                disabled={isDisabled}
                name="gender"
                onChange={({ target: { name, value } }) =>
                  handleChange(name, value)
                }
                className={cx("inputField")}
              />
            </div>
          </div>
          <div className={cx("saveChangeContainer")}>
            {!isDisabled && (
              <div onClick={handleSaveChanges}>
                <button>Save Changes</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default GetUser;
