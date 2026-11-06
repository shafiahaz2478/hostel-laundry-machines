function Usage({usages,kind,block}){
    let total_washer_usage = 0;
    let total_dryer_usage = 0;
    if (block === "") {
        for (let usage of Object.values(usages)) {
            if ("washer" in usage) {
                total_washer_usage += usage.washer
            }
            if ("dryer" in usage) {
                total_dryer_usage += usage.dryer
            }
        }
    }else {
        if ("washer" in usages[block]) {
                total_washer_usage = usages[block].washer
            }
        if ("dryer" in usages[block]) {
            total_dryer_usage = usages[block].dryer
        }
    }
    return <div className="usage-stats">
        {kind === "" || kind === "Dryer" ? <p className="usage-stat dryer">Dryer: {total_dryer_usage}</p>:null}
        {kind === "" || kind === "Washer" ? <p className="usage-stat">Washer: {total_washer_usage}</p>:null}
    </div>

}

export default Usage