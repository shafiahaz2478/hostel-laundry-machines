function AttentionMachine({attention}){
    return <div className="attention-card">
        <h3>{attention.name}</h3>
        <p>block: {attention.block}</p>
        <p>kind: {attention.kind}</p>
        <p>status: {attention.state}</p>
    </div>
}

export default AttentionMachine