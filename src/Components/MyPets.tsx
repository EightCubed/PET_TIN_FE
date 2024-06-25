import { useAuth } from "../context/AuthProvider";
import Header from "./Header";
import PetList from "./PetList";

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
