import {useState, useEffect} from "react";
import API_URL from "../API_URL.jsx";
import StudentLaundry from "./StudentLaundry.jsx";


function MyLaundry({studentRuns,setStudentRun}){


    return <div className="my-laundry">
        {studentRuns.map((studentRun) => {return <StudentLaundry key={studentRun} studentRun={studentRun} setStudentRun={setStudentRun} />})}
    </div>
}

export default MyLaundry