import ErrorMessage from "./ErrorMessage.jsx";
import {parseResponse, errorText} from "../api.js";
import { useState } from 'react';
import API_URL from "../API_URL.jsx";
function RollForm({setStudentRun}) {
  const [RollNo, setRollNo] = useState("");
  const [error, setError] = useState("");

  function handleChange(e) {    // function is an event handler used to update the component's state whenever someone types into the input field
    setRollNo(e.target.value);

  }
  function updateStudentRun(student){
    setError("")
    fetch(API_URL + "/runs/"+student)
        .then(parseResponse)
        .then((data) => setStudentRun(data))
        .catch((err) => setError(errorText(err)));
  }

  function handleSubmit(e) {
    e.preventDefault(); // Prevents the page from refreshing on form submit
    updateStudentRun(RollNo); // Pass the current RollNo state up to the parent component

  }

  return (
    <form className="inline-form" onSubmit={handleSubmit}>
      <label className="field">Enter your Roll No:
        <input
          type="text"
          value={RollNo}
          onChange={handleChange}
        />
      </label>
      <button type='submit'>Show</button>
      <p className="echo">{RollNo}</p>
      <ErrorMessage message={error} />
    </form>
  )
}


export default RollForm;
