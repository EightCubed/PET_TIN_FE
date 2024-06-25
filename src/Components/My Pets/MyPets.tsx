import { useAuth } from "../../context/AuthProvider";
import Header from "../Reusable Components/Header";
import PetList from "../Reusable Components/PetList";

const MyPets = () => {
  const { auth } = useAuth();

  return (
    <>
      <Header />
      <PetList userId={auth._id} deleteEnabled={true} />
    </>
  );
};

export default MyPets;
