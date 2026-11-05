import { useState } from 'react';
import API_URL from "../API_URL.jsx";
function RollForm({setStudentRun}) {
  const [RollNo, setRollNo] = useState("");

  function handleChange(e) {    // function is an event handler used to update the component's state whenever someone types into the input field
    setRollNo(e.target.value);

  }
  function updateStudentRun(student){
    fetch(API_URL + "/runs/"+student)
        .then((response) => response.json())
        .then((data) => setStudentRun(data));
  }

  function handleSubmit(e) {
    e.preventDefault(); // Prevents the page from refreshing on form submit
    updateStudentRun(RollNo); // Pass the current RollNo state up to the parent component

  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Enter your Roll No:
        <input
          type="text"
          value={RollNo}
          onChange={handleChange}
        />
      </label>
      <button type='submit'>Show</button>
      <p>{RollNo}</p>
    </form>
  )
}


export default RollForm;

