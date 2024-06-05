import { PetDataType } from "./types";

interface PetViewProps {
  petData: PetDataType;
}

const PetView = ({ petData }: PetViewProps) => {
  return <>{petData.petName}</>;
};

export default PetView;
