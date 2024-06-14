import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { Fetch } from "../utility Functions/fetch_utilites";
import { PetListType } from "./types";
import { initPetListData } from "./constants";
import PetView from "./PetView";
import styles from "./petlist.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const PetList = () => {
  const { auth } = useAuth();

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

  useEffect(() => {
    fetchPetList();
  }, []);

  return (
    <div className={cx("displayGrid")}>
      {petListData.data.length > 0 &&
        petListData.data.map((data) => (
          <div className={cx("gridItem")}>
            <PetView petData={data} />
          </div>
        ))}
    </div>
  );
};

export default PetList;
