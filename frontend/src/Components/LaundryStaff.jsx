import {useEffect, useState} from "react";
import API_URL from "../API_URL.jsx";
import AttentionMachine from "./AttentionMachine.jsx";
import Usage from "./Usage.jsx";
import ChangeService from "./ChangeService.jsx";

function LaundryStaff(){
    const [attention,setAttention] = useState([])
    const [usage,setUsage] = useState([])
    const [kind,setKind] = useState("")
    const [block,setBlock] = useState("")

    useEffect(() => {
    fetch(API_URL + "/attention")
        .then((response) => response.json())
        .then((data) => setAttention(data));
     }, []);
    useEffect(() => {
    fetch(API_URL + "/usage")
        .then((response) => response.json())
        .then((data) => setUsage(data));
     }, []);

    function handleBlock(e) {    // function is an event handler used to update the component's state whenever someone types into the input field
        setBlock(e.target.value);

    }
    function handleKind(e) {    // function is an event handler used to update the component's state whenever someone types into the input field
        setKind(e.target.value);

    }

    return <>
        <>
            <h2>Need Attention</h2>
            {attention.map((at) => <AttentionMachine key={at.id} attention={at}/>)}
        </>
        <>
            <h2>Today's Usage</h2>
            <>        block:

                <select name="type" value={block} onChange={handleBlock}>
                    <option value="">No Filter</option>
                    <option value="a">a</option>
                    <option value="b">b</option>
                    <option value="c">c</option>
                    <option value="d">d</option>
                </select>
                   kind:

                <select name="type" value={kind} onChange={handleKind}>
                    <option value="">No Filter</option>
                    <option value="Washer">Washer</option>
                    <option value="Dryer">Dryer</option>
                </select>

            </>
            <Usage usages={usage} block={block} kind={kind}/>
            <ChangeService />

        </>
    </>
}

export default LaundryStaff