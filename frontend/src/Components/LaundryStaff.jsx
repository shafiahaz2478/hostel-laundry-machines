import {useEffect, useState} from "react";
import API_URL from "../API_URL.jsx";
import AttentionMachine from "./AttentionMachine.jsx";

function LaundryStaff(){
    const [attention,setAttention] = useState([])
    useEffect(() => {
    fetch(API_URL + "/attention")
        .then((response) => response.json())
        .then((data) => setAttention(data));
  }, []);

    return <>
        <h2>Need Attention</h2>
        {attention.map((at) => <AttentionMachine key={at.id} attention={at}/>)}
    </>
}

export default LaundryStaff