import {useState} from 'react';
import API_URL from "../API_URL.jsx";
// TODO implement use machines from App.jsx later
function ChangeService() {
    const [machineID, setMachineID] = useState("");
    const [state, setState] = useState(1);

    const machIDS = [0, 1, 2, 3, 4, 5, 6, 7, 8]

    function handleMachine(e) {    // function is an event handler used to update the component's state whenever someone types into the input field
        setMachineID(e.target.value);

    }

    function updateMachine() {
        // fetch(API_URL + "/machines")
        //     .then((response) => response.json())
        //     .then((data) => setMachines(data));
    }


    function handleState(e) {
        setState(e.target.value)
    }

    function change() {
        fetch(API_URL + `/service/${machineID}?in_service=${state}`, {
            method: "PATCH"
        })
            .then((response) => response.json())
    }

    function handleSubmit(e) {
        e.preventDefault(); // Prevents the page from refreshing on form submit//
        change()

        updateMachine(); // Pass the current RollNo state up to the parent component

    }

    return (
        <form onSubmit={handleSubmit}>
            Machine:

            <select name="type" value={machineID} onChange={handleMachine}>
                {machIDS.map((id) => {
                    return <option key={id} value={id}>{id}</option>
                })}
            </select>
            State:

            <select name="type" value={state} onChange={handleState}>
                <option value={0}>Out of Order</option>
                <option value={1}>In Order</option>
            </select>
            <button type='submit'>Change</button>
            <p>{machineID}</p>
        </form>
    )
}


export default ChangeService;

