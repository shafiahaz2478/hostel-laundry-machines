import API_URL from "../API_URL.jsx";

function StudentLaundry({studentRun , setStudentRun}){
    function handleCollect(machineID) {
      fetch(API_URL + `/collect/${machineID}?roll_no=${studentRun.roll_no}`, {
        method: "PATCH"
      })
        .then((response) => response.json())
        .then(() => {
          return fetch(API_URL + "/runs/" + studentRun.roll_no);// fetching the updated list of plants

        })
        .then((response) => response.json())
        .then((data) => setStudentRun(data))
  }

    return <>
        <h2>{studentRun.machine_name}</h2>
        <p>started_at: {studentRun.started_at}</p>
        <p>status: {studentRun.status}</p>
        <p>{studentRun.remaining} min remaining</p>
        <button key={"Collect"} onClick={() => handleCollect(studentRun.machine_id)} >Collect</button>

    </>

}
export default StudentLaundry