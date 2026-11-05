import { useState,useEffect } from "react";
import './App.css'
import API_URL from "./API_URL.jsx";
import MachineCard from "./components/MachineCard.jsx";
import Machines from "./components/Machines.jsx";
import RollForm from "./components/RollForm.jsx";
import MyLaundry from "./components/MyLaundry.jsx";
import LaundryStaff from "./components/LaundryStaff.jsx";


function App() {
  const [machines,setMachines] = useState([])
  useEffect(() => {
    fetch(API_URL + "/machines")
        .then((response) => response.json())
        .then((data) => setMachines(data));
  }, []);

  const [studentRun , setStudentRun] = useState([])

  return <>
      <>
          <h1>Machines</h1>
          <Machines machines={machines} setMachine={setMachines}/>
      </>
    <>
      <h1>My Laundry</h1>
      <RollForm setStudentRun={setStudentRun} />
      <MyLaundry studentRuns={studentRun} setStudentRun={setStudentRun} />
    </>
    <>
      <h1>Laundry Staff</h1>
      <LaundryStaff machines={machines} setMachines={setMachines}/>
    </>


  </>
}

export default App
