import API_URL from "../API_URL";
import { useState } from "react";


function MachineCard({machine,setMachine}){
    const [RollNo, setRollNo] = useState("");
    let block = machine.block
    block = block.toUpperCase()
function startMachine(){
        fetch(API_URL + `/runs/${machine.id}?roll_no=${RollNo}`, {
            method: "POST",
        })
            .then((response) => response.json())
            .then(() => {
            return fetch(API_URL + "/machines");// fetching the updated list of plants

            })
            .then((response) => response.json())
            .then((data) => setMachine(data))
        }
  function handleChange(e) {    // function is an event handler used to update the component's state whenever someone types into the input field
    setRollNo(e.target.value);

  }
  function handleSubmit(e) {
    e.preventDefault(); // Prevents the page from refreshing on form submit
    startMachine(); // Pass the current RollNo state up to the parent component
    
  }

    

    return <>
    <h2>{machine.name}</h2>
    <p>Machine Id: {machine.id}</p>
    <p>Kind: {machine.kind}</p>
    <p>Block: {block}</p>
    <p>State: {machine.state}</p>
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
    <button onClick={startMachine}>Start The Machine</button>
    </>

}

export default MachineCard