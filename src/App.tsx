import { useContext, useEffect, useState } from "react";
import "./App.css";
import { Fetch } from "./Utility Functions/fetch_utilites";
import { PetListDataType } from "./Components/types";
import PetView from "./Components/PetView";
import AuthContext from "./Context/AuthProvider";

function App() {
  const [listData, setListData] = useState<PetListDataType[]>([]);

  const { setAuth } = useContext(AuthContext);

  const fetchData = async () => {
    try {
      const result = await Fetch<PetListDataType[]>("get", "listPets");
      setListData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(listData);

  return (
    <>
      <div className="card">
        <button onClick={() => {}}>Post</button>
        {listData && listData.map((data) => <PetView petData={data} />)}
      </div>
    </>
  );
}

export default App;
