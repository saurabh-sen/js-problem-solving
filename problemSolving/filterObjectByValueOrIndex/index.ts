console.log('Problem Solving - Filter Object By Value Or Index');

/**
 * Implement a function in JavaScript that filters an array of objects
 * based on the value or index.
 * 
 * The function should:
 * - Accept an array of objects and a search parameter (number or string)
 * - If the parameter is a number, return the object at that index
 * - If the parameter is a string, search for any object that has a property value matching the string
 * - Return the first matching object, or undefined if no match is found
 */

interface ObjectItem {
    [key: string]: string | number;
}

const filterObject = (arr: ObjectItem[], param: number | string) => {
    // Your implementation here
    if(typeof param === 'string'){
        const filteredValue = arr.find((item) => {
            return Object.values(item).some((value) => {
                return value === param;
            });
        });
        return filteredValue;
    }
    return arr[param];
}

// Test cases
const arr = [
    { name: "Amir", id: "1" },
    { name: "Samlan", id: "2" },
    { name: "Shahrukh", id: "0" },
];

console.log(filterObject(arr, 0)); // Expected: { name: "Amir", id: "1" }
console.log(filterObject(arr, "Amir")); // Expected: { name: "Amir", id: "1" }
console.log(filterObject(arr, "0")); // Expected: { name: "Shahrukh", id: "0" }

