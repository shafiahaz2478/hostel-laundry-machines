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
      <header className="app-hero">
          <span className="hero-badge">🫧 Hostel Laundry</span>
          <div className="hero-title">Service</div>
          <p className="hero-sub">Fresh, clean &amp; hassle-free laundry for everyone.</p>
      </header>
      <section className="section">
          <h1>Machines</h1>
          <Machines machines={machines} setMachine={setMachines}/>
      </section>
    <section className="section">
      <h1>My Laundry</h1>
      <RollForm setStudentRun={setStudentRun} />
      <MyLaundry studentRuns={studentRun} setStudentRun={setStudentRun} />
    </section>
    <section className="section">
      <h1>Laundry Staff</h1>
      <LaundryStaff machines={machines} setMachines={setMachines}/>
    </section>


  </>
}

export default App
