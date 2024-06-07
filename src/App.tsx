import { useEffect, useState } from "react";
import "./App.css";
import { PetListDataType } from "./Components/types";
import PetView from "./Components/PetView";
import Login from "./Components/Login";

function App() {
  const [listData, setListData] = useState<PetListDataType[]>([]);

  const fetchData = async () => {
    try {
      // const result = await Fetch<PetListDataType[]>("get", "listPets");
      // setListData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // console.log(listData);

  return (
    <>
      <div className="card">
        {listData && listData.map((data) => <PetView petData={data} />)}
        <Login />
      </div>
    </>
  );
}

export default App;
