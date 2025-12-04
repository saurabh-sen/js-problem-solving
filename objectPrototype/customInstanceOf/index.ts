console.log('Object Prototype Custom InstanceOf');

// const instanceOf = (obj: unknown, target: any) => {
//     if(obj === null || typeof obj !== 'object') return false;
    
//     // Get the prototype of the target constructor
//     const targetPrototype = target.prototype;
    
//     // Walk up the prototype chain
//     let currentProto = Object.getPrototypeOf(obj);
    
//     while(currentProto !== null) {
//         if(currentProto === targetPrototype) return true;
//         currentProto = Object.getPrototypeOf(currentProto);
//     }
    
//     return false;
// };

// recursive implementation
const instanceOf = (obj: unknown, target: any) => {
    if(obj === null || typeof obj !== 'object') return false;
    if(obj === target) return true;
    return instanceOf(Object.getPrototypeOf(obj), target);
};

// test cases
class P {}
class Q extends P {}
const q = new Q()
console.log(instanceOf(q, Q)) // true
console.log(instanceOf(q, P)) // true
console.log(instanceOf(q, Object)) // true
function R() {}
console.log(instanceOf(q, R)) // false
R.prototype = Q.prototype
console.log(instanceOf(q, R)) // true
R.prototype = {}
console.log(instanceOf(q, R)) // false
