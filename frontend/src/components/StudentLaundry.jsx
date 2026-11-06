import {useState} from "react";
import ErrorMessage from "./ErrorMessage.jsx";
import {parseResponse, errorText} from "../api.js";
import API_URL from "../API_URL.jsx";

function StudentLaundry({studentRun , setStudentRun}){
    const [error, setError] = useState("");
    function handleCollect(machineID) {
      setError("")
      fetch(API_URL + `/collect/${machineID}?roll_no=${studentRun.roll_no}`, {
        method: "PATCH"
      })
        .then(parseResponse)
        .then(() => {
          return fetch(API_URL + "/runs/" + studentRun.roll_no);// fetching the updated list of plants

        })
        .then((response) => response.json())
        .then((data) => setStudentRun(data))
        .catch((err) => setError(errorText(err)))
  }

    return <div className="run-card">
        <h2>{studentRun.machine_name}</h2>
        <p>started_at: {studentRun.started_at}</p>
        <p>status: {studentRun.status}</p>
        <p className="remaining">{studentRun.remaining} min remaining</p>
        <button key={"Collect"} onClick={() => handleCollect(studentRun.machine_id)} >Collect</button>
        <ErrorMessage message={error} />

    </div>

}
export default StudentLaundry