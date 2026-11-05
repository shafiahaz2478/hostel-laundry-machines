import {useEffect, useState} from 'react'
import RollForm from "./Components/RollForm.jsx";
import MyLaundry from "./Components/MyLaundry.jsx";
import API_URL from "./API_URL.jsx";
import LaundryStaff from "./Components/LaundryStaff.jsx";


function App() {
  const [studentRun , setStudentRun] = useState([])





  return <>
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
