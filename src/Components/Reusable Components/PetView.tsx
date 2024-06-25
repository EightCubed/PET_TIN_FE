import { PetDataType } from "../types";
import styles from "./petview.module.css";
import classNames from "classnames/bind";
import FormControlLabel from "@mui/material/FormControlLabel";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Checkbox from "@mui/material/Checkbox";
import LocationOnSharpIcon from "@mui/icons-material/LocationOnSharp";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Chip } from "@mui/material";
import { Fetch } from "../../utility Functions/fetch_utilites";
import { useAuth } from "../../context/AuthProvider";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatURL } from "../../utility Functions/utilities";

const cx = classNames.bind(styles);

interface PetViewProps {
  petData: PetDataType;
  deleteEnabled?: boolean;
  handlePetDelete?: (petId: string) => Promise<void>;
}

type Color =
  | "default"
  | "error"
  | "primary"
  | "secondary"
  | "info"
  | "success"
  | "warning";

interface ChipColors {
  [key: string]: Color;
}

const chipConverter: ChipColors = {
  Dog: "warning",
  Cat: "primary",
};

const returnChipColor = (name: string): Color => {
  return chipConverter[name] || "success";
};

const PetView = ({
  petData,
  deleteEnabled = false,
  handlePetDelete,
}: PetViewProps) => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  const [isPetLiked, setIsPetLiked] = useState(petData.isLikedByUser);

  const handleLike = async (
    e: React.MouseEvent<HTMLLabelElement, MouseEvent>,
    id: string
  ) => {
    e.stopPropagation();
    try {
      setIsPetLiked(!isPetLiked);
      await Fetch({
        method: "post",
        apiRoutes: "likePet",
        data: { data: { id } },
        bearerToken: auth.accessToken,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handlePetDeleteTrigger = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    try {
      if (handlePetDelete) handlePetDelete(petData._id);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePetEdit = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    navigate(formatURL("pet", petData._id, "edit"));
  };

  const { isDeletable, isEditable } = petData;

  return (
    <div className={cx("petDisplay")}>
      <div className={cx("chipStyle")}>
        <Chip
          label={petData.Species}
          variant="filled"
          color={petData.Species ? returnChipColor(petData.Species) : "default"}
          size="medium"
        />
      </div>
      <div className={cx("imageContainer")}>
        <img
          src={petData.ImageArray[0] ?? ""}
          className={cx("imageStyle")}
          width={300}
          height={170}
        />
        {!deleteEnabled && (
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
        )}
        {isEditable && (
          <div className={cx("trashIcon")} onClick={(e) => handlePetEdit(e)}>
            <EditIcon />
          </div>
        )}
        {isDeletable && (
          <div
            className={cx("trashIcon")}
            onClick={(e) => handlePetDeleteTrigger(e)}
          >
            <DeleteIcon />
          </div>
        )}
      </div>
      <div className={cx("petDetails")}>
        <div className={cx("firstRow")}>
          <div className={cx("petName")}>{petData.PetName}</div>
          <div className={cx("petAge")}>
            <Chip label={petData.Age} />
          </div>
        </div>
        <div className={cx("secondRow")}>
          <div className={cx("species")}>
            <p className={cx("nameWidth")}>Breed</p> :{" "}
            <p className={cx("petBreed")}>{petData.Breed}</p>
          </div>
        </div>
        <div className={cx("thirdRow")}>
          <LocationOnSharpIcon />
          {petData.Location.State},{petData.Location.Country}
        </div>
      </div>
    </div>
  );
};

export default PetView;
