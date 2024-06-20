import { useEffect, useState } from "react";
import { Fetch } from "../utility Functions/fetch_utilites";
import Header from "./Header";
import { PetListDataType, PetListType } from "./types";
import { useAuth } from "../context/AuthProvider";
import { initPetListData } from "./constants";
import styles from "./petlist.module.css";
import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import PetView from "./PetView";

const cx = classNames.bind(styles);

const LikedPets = () => {
  const {
    auth: { accessToken },
  } = useAuth();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [likedPetList, setLikedPetList] =
    useState<PetListType>(initPetListData);

  const fetchLikedPetsList = async () => {
    try {
      const response = await Fetch<PetListType>({
        method: "get",
        apiRoutes: "getLikedPets",
        bearerToken: accessToken,
      });
      setLikedPetList(response);
      setIsLoading(true);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLikedPetsList();
  }, []);

  const handleClick = (data: PetListDataType) => {
    navigate("/pet/" + data._id);
  };

  return (
    <div>
      <Header />
      <div className={cx("displayGrid")}>
        {isLoading &&
          likedPetList.data.length > 0 &&
          likedPetList.data.map((data) => (
            <div
              key={data._id}
              className={cx("gridItem")}
              onClick={() => handleClick(data)}
            >
              <PetView petData={data} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default LikedPets;
