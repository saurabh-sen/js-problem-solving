/**
 * Polyfill for lodash _.set() method
 * 
 * @param {object} obj - The object to modify
 * @param {string | string[]} path - The path of the property to set (supports dot notation and array notation)
 * @param {any} value - The value to set at the path
 * @returns {object} - Returns the modified object
 * 
 * Examples:
 * - set(obj, 'a.b.c', 'value') - dot notation
 * - set(obj, 'a.b.c.0', 'value') - accessing array element with dot
 * - set(obj, 'a.b.c[1]', 'value') - accessing array element with bracket notation
 * - set(obj, ['a', 'b', 'c'], 'value') - array path
 * - set(obj, 'a.b.d', 'value') - creates new path if it doesn't exist
 */

function set(obj: Record<string, any>, path: string | string[], value: any): Record<string, any> {
    // TODO: Implement the set function
    // Hints:
    // 1. Handle both string and array paths
    // 2. Parse the path string to handle dot notation (a.b.c) and bracket notation (a[0].b)
    // 3. Traverse the object following the path
    // 4. Create intermediate objects/arrays if they don't exist
    // 5. Set the value at the final key
    // 6. Return the modified object
    let copyObject = obj
    if (Array.isArray(path)) path = path.join('.');
    path = path.replace('[', '.');
    path = path.replace(']', '');
    const keys = path.split('.');
    for (let i = 0; i < keys.length - 1; ++i) {
        if (!copyObject.hasOwnProperty(keys[i])) {
            copyObject[keys[i]] = {};
        }
        copyObject = copyObject[keys[i]];
    }
    const lastKey = typeof keys[keys.length - 1] === 'number' ? +keys[keys.length - 1] : keys[keys.length - 1]
    if (copyObject[lastKey] !== undefined && typeof copyObject[lastKey] === 'object') {
        copyObject[lastKey] = { ...copyObject[lastKey], value };
    } else
        copyObject[lastKey] = value;
    return obj;
}

// Test cases
const obj1 = {
    a: {
        b: {
            c: [1, 2, 3]
        }
    }
};

console.log('Test 1 - set(obj1, "a.b.c", [4, 5, 6]):');
set(obj1, 'a.b.c', [4, 5, 6]);
console.log('Result:', obj1);
// Expected: { a: { b: { c: [4, 5, 6] } } }

const obj2 = {
    a: {
        b: {
            c: [1, 2, 3]
        }
    }
};

console.log('\nTest 2 - set(obj2, "a.b.c[1]", 10):');
set(obj2, 'a.b.c[1]', 10);
console.log('Result:', obj2);
// Expected: { a: { b: { c: [1, 10, 3] } } }

const obj3 = {
    a: {
        b: {
            c: [1, 2, 3]
        }
    }
};

console.log('\nTest 3 - set(obj3, "a.b.d", "new value"):');
set(obj3, 'a.b.d', 'new value');
console.log('Result:', obj3);
// Expected: { a: { b: { c: [1, 2, 3], d: 'new value' } } }

const obj4 = {};

console.log('\nTest 4 - set(obj4, "x.y.z", "deep value"):');
set(obj4, 'x.y.z', 'deep value');
console.log('Result:', obj4);
// Expected: { x: { y: { z: 'deep value' } } }

const obj5 = {
    user: {
        name: 'John',
        address: {
            city: 'New York'
        }
    }
};

console.log('\nTest 5 - set(obj5, "user.address.zipCode", "10001"):');
set(obj5, 'user.address.zipCode', '10001');
console.log('Result:', obj5);
// Expected: { user: { name: 'John', address: { city: 'New York', zipCode: '10001' } } }

const obj6 = {
    items: [{ id: 1 }, { id: 2 }]
};

console.log('\nTest 6 - set(obj6, "items[0].name", "Item 1"):');
set(obj6, 'items[0].name', 'Item 1');
console.log('Result:', obj6);
// Expected: { items: [{ id: 1, name: 'Item 1' }, { id: 2 }] }

const obj7 = {};

console.log('\nTest 7 - set(obj7, ["a", "b", "c"], "array path value"):');
set(obj7, ['a', 'b', 'c'], 'array path value');
console.log('Result:', obj7);
// Expected: { a: { b: { c: 'array path value' } } }
