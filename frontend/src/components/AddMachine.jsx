import {useState} from "react";

const API_URL = "http://127.0.0.1:8001";


function AddMachine({setMachines}){
    const [name,setName] = useState("")
    const [kind,setKind] = useState("Washer")
    const [block,setBlock] = useState("a")
    const [cycleInMins,setCycleInMins] = useState(20)

    function handleName(e) {    // function is an event handler used to update the component's state whenever someone types into the input field
        setName(e.target.value);
    }

    function handleKind(e) {    // function is an event handler used to update the component's state whenever someone types into the input field
        setKind(e.target.value);

    }
    function handleBlock(e) {    // function is an event handler used to update the component's state whenever someone types into the input field
        setBlock(e.target.value);
    }
    function handleCycle(e) {    // function is an event handler used to update the component's state whenever someone types into the input field
        setCycleInMins(e.target.value);
    }

    function addMachine(){
        fetch(API_URL + `/machines`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                  "name": name,
                  "block": block,
                  "kind": kind,
                  "cycle_minutes": cycleInMins
                })
        })
            .then((response) => response.json())
            .then(() => {
                return fetch(API_URL + "/machines");// fetching the updated list of plants

            })
            .then((response) => response.json())
            .then((data) => setMachines(data))

    }

    function handleSubmit(e) {
        e.preventDefault(); // Prevents the page from refreshing on form submit
        addMachine()
    }

    return <>
        <form onSubmit={handleSubmit}>
            <label>Name:
                <input
                    type="text"
                    value={name}
                    onChange={handleName}
                />
            </label>

            <label>kind:
                <select name="type" value={kind} onChange={handleKind}>
                    <option value="Washer">Washer</option>
                    <option value="Dryer">Dryer</option>
                </select>

            </label>
            <label>block:
                <select name="type" value={block} onChange={handleBlock}>
                    <option value="a">A</option>
                    <option value="b">B</option>
                    <option value="c">C</option>
                    <option value="d">D</option>
                </select>
            </label>
            <label>Cycle in Minutes:
                <input
                    type="number"
                    value={cycleInMins}
                    onChange={handleCycle}
                    min="20"
                    max="90"
                />
            </label>
            <button type='submit'>Add</button>
        </form>

    </>
}

export default AddMachine