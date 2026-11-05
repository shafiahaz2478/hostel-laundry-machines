import {useState} from "react";

const API_URL = "http://127.0.0.1:8001";

// TODO implement use machines from App.jsx later

function AddMachine(){
    const [name,setName] = useState("")
    const [kind,setKind] = useState("Washer")
    const [block,setBlock] = useState("a")
    const [cycleInMins,setCycleInMins] = useState(1)

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

    function addPlant(){
        let query = `?name=${name}&type=${kind}&location=${block}&water_every_days=${cycleInMins}`;
        fetch(API_URL + `/plants` + query, {
            method: "POST"

        })
            .then((response) => response.json())
            .then(() => {
                return fetch(API_URL + "/plants");// fetching the updated list of plants

            })
            .then((response) => response.json())
            // .then((data) => setMachines(data))

    }

    function handleSubmit(e) {
        e.preventDefault(); // Prevents the page from refreshing on form submit
        addPlant()
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
            <label>location:
                <input
                    type="text"
                    value={block}
                    onChange={handleBlock}
                />
            </label>
            <label>water every days:
                <input
                    type="number"
                    value={cycleInMins}
                    onChange={handleCycle}
                    min="1"
                    max="14"
                />
            </label>
            <button type='submit'>Add</button>
        </form>

    </>
}

export default AddPlant