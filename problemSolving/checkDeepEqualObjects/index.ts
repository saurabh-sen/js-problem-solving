console.log('Problem Solving - Check Deep Equal Objects');

const deepEqual = (obj1: Record<string, any>, obj2: Record<string, any>) => {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if(keys1.length !== keys2.length)return false;
    for(const key of keys1){
        const val1 = obj1[key];
        const val2 = obj2[key];
        if(typeof val1 !== typeof val2)return false;
        const areObjects = val1 && typeof val1 === "object" && val2 && typeof
val2 === "object";

        if(areObjects){
            if(!deepEqual(val1, val2))return false;
        }
        else if(!areObjects && val1 !== val2){
            return false;
        }
    }
    return true;
}

const obj1 = {
    name: "learnersbucket",
    details: {
        x: [1, 2],
        y: 3,
    },
};
const obj2 = {
    name: "learnersbucket",
    details: {
        y: 2,
        x: [1, 2],
    },
};
console.log(deepEqual(obj1, obj2));