console.log('Problem Solving - Piping Function');

/**
 * Piping Function in JavaScript – Part 1
 * 
 * Problem Statement:
 * Given an object which can have a function as a value at a nested level,
 * create a function that will accept arguments as input and pass it
 * through all the functions in the input object and return the computed value.
 * 
 * Non-function values should remain unchanged in the output.
 */

interface IPipeObject {
    [key: string]: ((...args: any[]) => any) | IPipeObject | any;
}

interface IPipeResult {
    [key: string]: any;
}

const dfs = (obj: IPipeObject, args: any[]) => {
    const result: IPipeObject = {}
    const keys = Object.keys(obj);
    keys.forEach(key => {
        const value = obj[key];
        if(typeof value === 'function'){
            result[key] = value(...args);
        }else if(typeof value === 'object'){
            result[key] = dfs(value, args);
        }else result[key] = value;
    })
    return result;
}

const pipe = (obj: IPipeObject): ((...args: any[]) => IPipeResult) => {
    // TODO: Implement the pipe function
    return (...args: any[]) => {
        return dfs(obj, args);
    };
};

// Test case
const test = {
    a: {
        b: (a: number, b: number, c: number) => a + b + c,
        c: (a: number, b: number, c: number) => a + b - c,
    },
    d: (a: number, b: number, c: number) => a - b - c,
    e: 1,
    f: true
};

const p1 = pipe(test);
console.log("dfsf", p1(1, 1, 1));
const p2 = pipe(test);
console.log("dfsf", p1(2, 2, 2));
const p3 = pipe(test);
console.log("dfsf", p1(3, 3, 3));

// Expected Output:
// {
//     "a": {
//         "b": 3,
//         "c": 1
//     },
//     "d": -1,
//     "e": 1,
//     "f": true
// }

