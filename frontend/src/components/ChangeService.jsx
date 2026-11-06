import ErrorMessage from "./ErrorMessage.jsx";
import {parseResponse, errorText} from "../api.js";
import {useState} from 'react';
import API_URL from "../API_URL.jsx";
// TODO implement use machines from App.jsx later
function ChangeService({machines,setMachines}) {
    const [machineID, setMachineID] = useState("");
    const [state, setState] = useState(1);
    const [error, setError] = useState("");

    function handleMachine(e) {    // function is an event handler used to update the component's state whenever someone types into the input field
        setMachineID(e.target.value);

    }


    function handleState(e) {
        setState(e.target.value)
    }

    function change() {
        setError("")
        fetch(API_URL + `/service/${machineID}?in_service=${state}`, {
            method: "PATCH"
        })
            .then(parseResponse)
            .then(() => {fetch(API_URL + "/machines")
            .then((response) => response.json())
            .then((data) => setMachines(data))})
            .catch((err) => setError(errorText(err)))
    }

    function handleSubmit(e) {
        e.preventDefault(); // Prevents the page from refreshing on form submit//
        change()
    }

    return (
        <form className="inline-form" onSubmit={handleSubmit}>
            <label className="field">Machine:

            <select name="type" value={machineID} onChange={handleMachine}>
                {machines.map((machine) => {
                    return <option key={machine.id} value={machine.id}>{machine.name}</option>
                })}
            </select>
            </label>
            <label className="field">State:

            <select name="type" value={state} onChange={handleState}>
                <option value={0}>Out of Order</option>
                <option value={1}>In Order</option>
            </select>
            </label>
            <button type='submit'>Change</button>
            <p className="echo">{machineID}</p>
            <ErrorMessage message={error} />
        </form>
    )
}


export default ChangeService;
