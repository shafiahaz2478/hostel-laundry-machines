import { useState,useEffect } from "react";
import './App.css'
import API_URL from "./API_URL.jsx";
import MachineCard from "./components/MachineCard";
import Machines from "./components/Machines";


function App() {
  const [machines,setMachines] = useState([])
  useEffect(() => {
    fetch(API_URL + "/machines")
        .then((response) => response.json())
        .then((data) => setMachines(data));
  }, []);

  return <>
    <Machines machines={machines} setMachine={setMachines}/>


  </>
}

export default App