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
import Loader from "./Loader";
import { Carousel } from "react-bootstrap";

const cx = classNames.bind(styles);

const IndividualPetView = () => {
  const { id } = useParams();
  const { auth } = useAuth();

  const [petData, setPetData] = useState<PetListDataType>(initPetData);
  const [isPetLiked, setIsPetLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
      setIsLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPetData();
  }, []);

  const handleLike = async (
    e: React.MouseEvent<HTMLLabelElement, MouseEvent>,
    id: string
  ) => {
    e.stopPropagation();
    try {
      await Fetch({
        method: "post",
        apiRoutes: "likePet",
        data: { data: { id } },
        bearerToken: auth.accessToken,
      });
      fetchPetData();
    } catch (err) {
      setIsPetLiked(!isPetLiked);
      console.error(err);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  const {
    ImageArray,
    PetName,
    numberOfLikes,
    Location,
    OwnerDetails,
    Description,
  } = petData;

  console.log(ImageArray);

  return (
    <div>
      {isLoading && <Loader />}
      <Header />
      <div className={cx("displayDetailContainer")}>
        <div className={cx("petNameContainer")}>
          <div className={cx("petName")}>{PetName}</div>
        </div>
        <div className={cx("heartIconContainer")}>
          <div className={cx("interestedWidth")}>People interested </div>
          <div className={cx("numberOfLikes")}>
            <Chip
              label={numberOfLikes}
              variant="filled"
              color={"primary"}
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
        <Carousel fade data-bs-theme="dark">
          {ImageArray.map((activeImage) => (
            <Carousel.Item interval={5000}>
              <div className={cx("imageContainer")}>
                <img src={activeImage} className={cx("petImageStyle")} />
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
        <div className={cx("aboutThePet")}>
          <div className={cx("aboutThePetTitle")}>About This Pet </div>
          <div className={cx("aboutThePetBody")}>{Description}</div>
        </div>
        <div className={cx("lastRow")}>
          <div className={cx("locationContainer")}>
            <div className={cx("locationTitle")}>Location Details</div>
            <div className={cx("detailsFirstLine")}>
              <div className={cx("space")}>{Location.City},</div>
              <div>{Location.State}</div>
            </div>
            <div>{Location.Country}</div>
          </div>
          <div className={cx("ownerContainer")}>
            <div className={cx("ownerTitle")}>Owner Details</div>
            <div className={cx("detailsFirstLine")}>
              <div className={cx("space")}>{OwnerDetails.FirstName}</div>
              <div className={cx("space")}>{OwnerDetails.LastName}</div>
              <div>({OwnerDetails.Gender})</div>
            </div>

            <div>{OwnerDetails.Age}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualPetView;
