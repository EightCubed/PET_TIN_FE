import { PetDataType } from "./types";
import styles from "./petview.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

interface PetViewProps {
  petData: PetDataType;
}

const PetView = ({ petData }: PetViewProps) => {
  console.log(petData);

  return (
    <div className={cx("petDisplay")}>
      <div className={cx("imageContainer")}>
        <img src={petData.ImageUrl} className={cx("imageStyle")} />
      </div>
      <div className={cx("petDetails")}>
        <div className={cx("petName")}>{petData.PetName}</div>
        <div className={cx("petAge")}>({petData.Age})</div>
      </div>
    </div>
  );
};

export default PetView;
