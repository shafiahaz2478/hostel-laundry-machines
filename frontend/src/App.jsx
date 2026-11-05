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
  const [start,setStart] = useState([])
  useEffect(() => {
    fetch(API_URL + "/runs/{machine_id}")
        .then((response) => response.json())
        .then((data) => setS(data));
  }, [])

  return <>
    <Machines machines={machines} setStart={setStart}/>


  </>
}

export default App