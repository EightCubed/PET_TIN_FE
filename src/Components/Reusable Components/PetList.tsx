import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { Fetch } from "../utility Functions/fetch_utilites";
import { PetListDataType, PetListType } from "./types";
import { initPetListData } from "./constants";
import PetView from "./PetView";
import styles from "./petlist.module.css";
import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import Loader from "./Reusable Components/Loader";
import { formatURL } from "../utility Functions/utilities";

const cx = classNames.bind(styles);

interface PetListProps {
  userId?: string;
  deleteEnabled?: boolean;
}

const PetList = ({ userId, deleteEnabled = false }: PetListProps) => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const [petListData, setPetListData] = useState<PetListType>(initPetListData);

  const fetchPetList = async () => {
    try {
      const response = await Fetch<PetListType>({
        method: "get",
        apiRoutes: "listPets",
        bearerToken: auth.accessToken,
        id: userId ?? "",
      });
      setPetListData(response);
      setIsLoading(false);
    } catch (err) {
      console.error("Something Went Wrong!!!");
    }
  };

  const handlePetDelete = async (petId: string) => {
    try {
      const response = await Fetch({
        method: "delete",
        apiRoutes: "deletePet",
        id: petId,
        bearerToken: auth.accessToken,
      });
      console.log(response);
      fetchPetList();
    } catch (err) {
      console.error(err);
      fetchPetList();
    }
  };

  const handleClick = (data: PetListDataType) => {
    navigate(formatURL("pet", data._id));
  };

  useEffect(() => {
    fetchPetList();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={cx("displayGrid")}>
      {petListData.data.length > 0 &&
        petListData.data.map((data) => (
          <div
            key={data._id}
            className={cx("gridItem")}
            onClick={() => handleClick(data)}
          >
            <PetView
              petData={data}
              deleteEnabled={deleteEnabled}
              handlePetDelete={handlePetDelete}
            />
          </div>
        ))}
    </div>
  );
};

export default PetList;
