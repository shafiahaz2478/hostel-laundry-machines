import ErrorMessage from "./ErrorMessage.jsx";
import {parseResponse, errorText} from "../api.js";
import API_URL from "../API_URL.jsx";
import { useState } from "react";


function MachineCard({machine,setMachine}){
    const [RollNo, setRollNo] = useState("");
    const [error, setError] = useState("");
    let block = machine.block
    block = block.toUpperCase()
function startMachine(){
        setError("")
        fetch(API_URL + `/runs/${machine.id}?roll_no=${RollNo}`, {
            method: "POST",
        })
            .then(parseResponse)
            .then(() => {
            return fetch(API_URL + "/machines");// fetching the updated list of plants

            })
            .then((response) => response.json())
            .then((data) => setMachine(data))
            .catch((err) => setError(errorText(err)))
        }
function clearMachine(){
        setError("")
        fetch(API_URL + `/clear/${machine.id}?roll_no=${RollNo}`, {
            method: "PATCH",
        })
            .then(parseResponse)
            .then(() => {
            return fetch(API_URL + "/machines");// fetching the updated list of plants

            })
            .then((response) => response.json())
            .then((data) => setMachine(data))
            .catch((err) => setError(errorText(err)))
        }

  function handleChange(e) {    // function is an event handler used to update the component's state whenever someone types into the input field
    setRollNo(e.target.value);

  }
  function handleSubmit(e) {
    e.preventDefault(); // Prevents the page from refreshing on form submit
    startMachine(); // Pass the current RollNo state up to the parent component
    
  }
  function handleSubmitClear(e) {
    e.preventDefault(); // Prevents the page from refreshing on form submit
    clearMachine(); // Pass the current RollNo state up to the parent component
    
  }


    

    return <div className={"machine-card state-" + machine.state}>
    <div className="machine-head">
      <span className="machine-icon"></span>
      <div className="machine-title"><h2>{machine.name}</h2></div>
      <span className={"badge state-" + machine.state}>{machine.state}</span>
    </div>
    <div className="details">
      <p className="detail"><span className="label">Machine Id:</span> {machine.id}</p>
      <p className="detail"><span className="label">Kind:</span> {machine.kind}</p>
      <p className="detail"><span className="label">Block:</span> {block}</p>
      <p className="detail"><span className="label">State:</span> {machine.state}</p>
    </div>
    <form className="machine-form" onSubmit={machine.state==="free"? handleSubmit : handleSubmitClear}>
      <label>Enter your Roll No:
        <input
          type="text" 
          value={RollNo}
          onChange={handleChange}
        />
      </label>
      <p className="echo">{RollNo}</p>
    </form><div className="machine-actions">{machine.state === "free"? 
        <button className="btn-start" onClick={startMachine}>Start The Machine</button>:
        <button className="btn-clear" onClick={clearMachine}>Clear The Machine</button>
    }</div>
    <ErrorMessage message={error} />
    </div>

}

export default MachineCard
