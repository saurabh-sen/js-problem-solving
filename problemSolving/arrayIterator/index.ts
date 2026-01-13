console.log('Array Iterator Implementation');

/**
 * Problem Statement:
 * Create an iterator method that accepts an array and returns a new
 * method that will return the next array value on each invocation.
 * 
 * Requirements:
 * - next() method: returns the next value in the array
 * - done() method: returns true if iteration is complete, false otherwise
 * - When iteration is complete, next() should return null
 * 
 * Example:
 * let iterator = helper([1, 2, "hello"]);
 * console.log(iterator.next()); // 1
 * console.log(iterator.next()); // 2
 * console.log(iterator.done()); // false
 * console.log(iterator.next()); // "hello"
 * console.log(iterator.done()); // true
 * console.log(iterator.next()); // null
 */

interface Iterator<T> {
    next: () => T | null;
    done: () => boolean;
}

const helper = <T>(arr: T[]): Iterator<T> => {
    // TODO: Initialize variables to track the current position
    let iteratorIndex = 0;
    
    return {
        next: () => {
            // TODO: Implement logic to return the next element
            // If there are more elements, return the current element and move to next
            // Otherwise, return null
            if(arr.length < iteratorIndex)return null;
            return arr[iteratorIndex++] || null;
        },
        done: () => {
            // TODO: Implement logic to check if iteration is complete
            // Return true if all elements have been iterated, false otherwise
            return arr.length <= iteratorIndex;
        }
    };
};

// Test cases
let iterator = helper([1, 2, "hello"]);
console.log(iterator.next()); // Expected: 1
console.log(iterator.next()); // Expected: 2
console.log(iterator.done()); // Expected: false
console.log(iterator.next()); // Expected: "hello"
console.log(iterator.done()); // Expected: true
console.log(iterator.next()); // Expected: null