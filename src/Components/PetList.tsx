import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { Fetch } from "../utility Functions/fetch_utilites";
import { PetListDataType, PetListType } from "./types";
import { initPetListData } from "./constants";
import PetView from "./PetView";
import styles from "./petlist.module.css";
import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

const PetList = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  const [petListData, setPetListData] = useState<PetListType>(initPetListData);

  const fetchPetList = async () => {
    try {
      const response = await Fetch<PetListType>({
        method: "get",
        apiRoutes: "listPets",
        bearerToken: auth.accessToken,
      });
      setPetListData(response);
    } catch (err) {
      console.error("Something Went Wrong!!!");
    }
  };

  const handleClick = (data: PetListDataType) => {
    console.log(data._id);
    navigate("/pet/" + data._id);
  };

  useEffect(() => {
    fetchPetList();
  }, []);

  return (
    <div className={cx("displayGrid")}>
      {petListData.data.length > 0 &&
        petListData.data.map((data) => (
          <div
            key={data._id}
            className={cx("gridItem")}
            onClick={() => handleClick(data)}
          >
            <PetView petData={data} />
          </div>
        ))}
    </div>
  );
};

export default PetList;
