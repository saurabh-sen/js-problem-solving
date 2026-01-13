console.log('Problem Solving - Aggregate Array Of Objects');

/**
 * Aggregate array of objects on the given keys
 * 
 * Problem Statement:
 * Given an array of objects and two keys "on" and "who", aggregate the
 * "who" values on the "on" values.
 * 
 * The function should:
 * - Accept an array of objects and two keys: "on" (to group by) and "who" (to aggregate)
 * - Group objects by the "on" key value
 * - Collect all "who" key values for each group
 * - Return an array of objects where each object has the "on" key and an array of "who" values
 * 
 * Example:
 * Input: aggregate(endorsements, "user", "skill")
 * Output: [
 *   { user: "Bill", skill: ["css", "javascript"] },
 *   { user: "Chad", skill: ["javascript"] },
 *   { user: "Sue", skill: ["css", "javascript", "html"] }
 * ]
 */

interface GenericObject {
    [key: string]: any;
}

const aggregate = (arr: GenericObject[], on: string, who: string): GenericObject[] => {
    // Your implementation here
    const normalizedResultObj = arr.reduce((prev, cur, ind)=> {
        const curOnValue = cur[on] // bill
        const curWhoValue = cur[who] // css
        prev[curOnValue] = [curWhoValue, ...(prev[curOnValue]||[])]
        return prev;
    },{});
    const result: GenericObject[] = [];
    Object.keys(normalizedResultObj).forEach((key) => {
        result.push({
            [on]: key,
            [who]: normalizedResultObj[key],
        })
    })
    return result;
}

// Test cases
const endorsements = [
    { skill: 'css', user: 'Bill' },
    { skill: 'javascript', user: 'Chad' },
    { skill: 'javascript', user: 'Bill' },
    { skill: 'css', user: 'Sue' },
    { skill: 'javascript', user: 'Sue' },
    { skill: 'html', user: 'Sue' }
];

console.log(aggregate(endorsements, "user", "skill"));
// Expected Output:
// [
//   { user: "Bill", skill: ["css", "javascript"] },
//   { user: "Chad", skill: ["javascript"] },
//   { user: "Sue", skill: ["css", "javascript", "html"] }
// ]

console.log('\n--- Additional Test Case ---\n');

const projects = [
    { project: 'ProjectA', developer: 'Alice' },
    { project: 'ProjectB', developer: 'Bob' },
    { project: 'ProjectA', developer: 'Charlie' },
    { project: 'ProjectB', developer: 'Alice' },
    { project: 'ProjectC', developer: 'Alice' }
];

console.log(aggregate(projects, "developer", "project"));
// Expected Output:
// [
//   { developer: "Alice", project: ["ProjectA", "ProjectB", "ProjectC"] },
//   { developer: "Bob", project: ["ProjectB"] },
//   { developer: "Charlie", project: ["ProjectA"] }
// ]

