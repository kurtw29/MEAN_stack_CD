function DFS(origin, a_list, dest = null){
    var tracker = { [`${origin}`]: [0, null]};
    let p_list = [];
    p_list.push(origin)
    var hotseat = origin;
    console.log("tracker: ", tracker)
    console.log("hotseat: ", hotseat, "tracker: ", tracker[`${hotseat}`])
    while(p_list.length > 0){
        hotseat = p_list.pop();
        for(let location of a_list[`${hotseat}`]){
            if(!tracker[location]){
                let distance = tracker[`${hotseat}`][0]+1
                tracker[location] = [distance, hotseat]
                p_list.push(location);
            }
        }
    }
    return tracker;
}

a_list = {
    "a": ["b", "d"],
    "b": ["c", "d"],
    "c": ["e", "f"],
    "d": ["a", "e"],
    "e": [],
    "f": ["c", "e"]
}

console.log("DFS(a, a_list: \n", DFS("a", a_list))