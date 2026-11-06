import ErrorMessage from "./ErrorMessage.jsx";
import {parseResponse, errorText} from "../api.js";
import {useEffect, useState} from "react";
import API_URL from "../API_URL.jsx";
import AttentionMachine from "./AttentionMachine.jsx";
import Usage from "./Usage.jsx";
import ChangeService from "./ChangeService.jsx";
import AddMachine from "./AddMachine.jsx";

function LaundryStaff({machines,setMachines}){
    const [attention,setAttention] = useState([])
    const [usage,setUsage] = useState([])
    const [kind,setKind] = useState("")
    const [block,setBlock] = useState("")
    const [usageError,setUsageError] = useState("")

    useEffect(() => {
    fetch(API_URL + "/attention")
        .then((response) => response.json())
        .then((data) => setAttention(data));
     }, []);
    useEffect(() => {
    fetch(API_URL + "/usage")
        .then(parseResponse)
        .then((data) => setUsage(data))
        .catch((err) => setUsageError(errorText(err)));
     }, []);

    function handleBlock(e) {    // function is an event handler used to update the component's state whenever someone types into the input field
        setBlock(e.target.value);

    }
    function handleKind(e) {    // function is an event handler used to update the component's state whenever someone types into the input field
        setKind(e.target.value);

    }

    return <>
        <div className="staff-block">
            <h2>Need Attention</h2>
            <div className="attention-list">
            {attention.map((at) => <AttentionMachine key={at.id} attention={at}/>)}
            </div>
        </div>
        <div className="staff-block">
            <h2>Today's Usage</h2>
            <div className="filter-bar">        <label className="filter">block:

                <select name="type" value={block} onChange={handleBlock}>
                    <option value="">No Filter</option>
                    <option value="a">A</option>
                    <option value="b">B</option>
                    <option value="c">C</option>
                    <option value="d">D</option>
                </select>
                </label>
                   <label className="filter">kind:

                <select name="type" value={kind} onChange={handleKind}>
                    <option value="">No Filter</option>
                    <option value="Washer">Washer</option>
                    <option value="Dryer">Dryer</option>
                </select>
                </label>

            </div>
            {usageError ? <ErrorMessage message={usageError} /> : <Usage usages={usage} block={block} kind={kind}/>}
        </div>
        <div className="staff-forms">
            <div className="staff-block">
                <h2>Change Service</h2>
                <ChangeService machines={machines} setMachines={setMachines}/>
            </div>
            <div className="staff-block">
                <h2>Add Machine</h2>
                <AddMachine setMachines={setMachines}/>
            </div>
        </div>
    </>
}

export default LaundryStaff