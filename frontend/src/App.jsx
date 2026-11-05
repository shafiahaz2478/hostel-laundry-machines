import { useState,useEffect } from "react";
import './App.css'
import API_URL from "./API_URL.jsx";
import MachineCard from "./components/MachineCard";
import Machines from "./components/Machines";
import RollForm from "./Components/RollForm.jsx";
import MyLaundry from "./Components/MyLaundry.jsx";
import LaundryStaff from "./Components/LaundryStaff.jsx";


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
          <Machines machines={machines} setMachine={setMachines}/>
      </>
    <>
      <h1>My Laundry</h1>
      <RollForm setStudentRun={setStudentRun} />
      <MyLaundry studentRuns={studentRun} setStudentRun={setStudentRun} />
    </>
    <>
      <h1>Laundry Staff</h1>
      <LaundryStaff />
    </>


  </>
}

export default App
