function AttentionMachine({attention}){
    return <>
        <h3>{attention.name}</h3>
        <p>block: {attention.block}</p>
        <p>kind: {attention.kind}</p>
        <p>status: {attention.state}</p>
    </>
}

export default AttentionMachine