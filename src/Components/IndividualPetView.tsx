import { useParams } from "react-router-dom";
import Header from "./Header";
import { Fetch } from "../utility Functions/fetch_utilites";
import { useAuth } from "../context/AuthProvider";
import { useEffect, useState } from "react";
import { PetListDataType } from "./types";
import { initPetData } from "./constants";
import styles from "./individualpetview.module.css";
import classNames from "classnames/bind";
import { FormControlLabel, Checkbox, Chip } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const cx = classNames.bind(styles);

const IndividualPetView = () => {
  const { id } = useParams();
  const { auth } = useAuth();

  const [petData, setPetData] = useState<PetListDataType>(initPetData);
  const [isPetLiked, setIsPetLiked] = useState(false);

  const fetchPetData = async () => {
    try {
      const response = await Fetch<PetListDataType>({
        method: "get",
        apiRoutes: "getPet",
        bearerToken: auth.accessToken,
        id,
      });
      setPetData(response);
      setIsPetLiked(response.isLikedByUser);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPetData();
  }, [isPetLiked]);

  const handleLike = async (
    e: React.MouseEvent<HTMLLabelElement, MouseEvent>,
    id: string
  ) => {
    e.stopPropagation();
    try {
      setIsPetLiked(!isPetLiked);
      const response = await Fetch({
        method: "post",
        apiRoutes: "likePet",
        data: { data: { id } },
        bearerToken: auth.accessToken,
      });
      console.log("Liked", response);
    } catch (err) {
      setIsPetLiked(!isPetLiked);
      console.error(err);
    }
  };

  const { ImageUrl, PetName, numberOfLikes, Location, Owner } = petData;

  return (
    <div>
      <Header />
      <div className={cx("displayDetailContainer")}>
        <div>
          <div>{PetName}</div>
        </div>
        <div className={cx("heartIconContainer")}>
          <div className={cx("interestedWidth")}>People interested </div>
          <div className={cx("numberOfLikes")}>
            <Chip
              label={numberOfLikes}
              variant="filled"
              color={"default"}
              size="medium"
            />
          </div>
          <div className={cx("heartIcon")}>
            <FormControlLabel
              control={
                <Checkbox
                  icon={<FavoriteBorderIcon />}
                  checkedIcon={<FavoriteIcon />}
                  onClick={() => {}}
                  checked={isPetLiked}
                />
              }
              onClick={(e) => handleLike(e, petData._id)}
              label={""}
            />
          </div>
        </div>
        <div className={cx("imageContainer")}>
          <img src={ImageUrl} className={cx("petImageStyle")} />
        </div>
        <div>
          <div>About This Pet </div>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum
          </div>
        </div>
        <div className={cx("lastRow")}>
          <div>
            <div>Location</div>
            <div>{Location.City}</div>
            <div>{Location.State}</div>
            <div>{Location.Country}</div>
          </div>
          <div>
            <div>Owner Details</div>
            <div>
              <div>{Owner.First}</div>
              <div>{Owner.Last}</div>
            </div>
            <div>{Owner.Gender}</div>
            <div>{Owner.Age}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualPetView;
