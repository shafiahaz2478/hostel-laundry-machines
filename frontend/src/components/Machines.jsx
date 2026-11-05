import MachineCard from "./MachineCard.jsx"
import { useState,useEffect } from "react";


function Machines({machines,setMachine}){
    const [kind,setKind] = useState("")
    const [block,setBlock] = useState("")
function handleKind(event){              //event is event object holding the current selected option so use .target.value to get the value for that option
    setKind(event.target.value)
}
function handleBlock(event){
    setBlock(event.target.value)
}

    let filteredmachine = [...machines] //unpacks and stores all of machines in filteredmachine
    if (kind !== ""){
        filteredmachine = filteredmachine.filter((machine) => machine.kind === kind)
    }
    if (block !== ""){
        filteredmachine = filteredmachine.filter((machine) => machine.block === block)
    }

    
 return <>
 <>        kind:

        <select name="kind" value={kind} onChange={handleKind}>
            <option value="">No Filter</option>
            <option value="dryer">Dryer</option>
            <option value="washer">Washer</option>
        </select>
        </>
        <>        block:

        <select name="kind" value={block} onChange={handleBlock}>
            <option value="">No Filter</option>
            <option value="a">Block A</option>
            <option value="b">Block B</option>
            <option value="c">Block C</option>
            <option value="d">Block D</option>
        </select>
        </>
        
    {filteredmachine.map((machine) => {return <MachineCard key={machine.id} machine={machine} setMachine={setMachine}/>})}
    
 </>
}

export default Machines 