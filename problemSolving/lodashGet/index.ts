// c[1] || hobbies[1]
const separateKeyAndIndex = (key: string) => {
    return [key.split('[')[0], key.split('[')[1]?.split(']')[0]];
}

/**
 * Polyfill for lodash _.get() method
 * 
 * @param {object} obj - The object to query
 * @param {string | string[]} path - The path of the property to get (supports dot notation and array notation)
 * @param {any} defaultValue - The value returned if the resolved value is undefined (optional)
 * @returns {any} - Returns the resolved value or undefined
 * 
 * Examples:
 * - get(obj, 'a.b.c') - dot notation
 * - get(obj, 'a.b.c.0') - accessing array element with dot
 * - get(obj, 'a.b.c[1]') - accessing array element with bracket notation
 * - get(obj, ['a', 'b', 'c', '1']) - array path
 */

function get(obj: Record<string, any>, path: string | string[], defaultValue?: any): any {
    // TODO: Implement the get function
    // Hints:
    // 1. Handle both string and array paths
    // 2. Parse the path string to handle dot notation (a.b.c) and bracket notation (a[0].b)
    // 3. Traverse the object following the path
    // 4. Return undefined if any step in the path is invalid
    // 5. Optionally return defaultValue if provided and path is invalid
    let copyObject = structuredClone(obj);
    if (Array.isArray(path)) path = path.join('.');
    const keys = path.split('.');
    keys.forEach((key) => {
        let value = null;
        if (key.includes('[')) {
            const keyAndIndex = separateKeyAndIndex(key);
            const valueOfKey = copyObject?.[keyAndIndex[0]];
            value = valueOfKey[+keyAndIndex[1]] ?? defaultValue;
        } else {
            value = copyObject[key] ?? defaultValue;
        }
        copyObject = value
    })
    return copyObject
}

// Test cases
const obj = {
    a: {
        b: {
            c: [1, 2, 3]
        }
    }
};

console.log('Test 1 - get(obj, "a.b.c"):', get(obj, 'a.b.c'));
// Expected: [1, 2, 3]

console.log('Test 2 - get(obj, "a.b.c.0"):', get(obj, 'a.b.c.0'));
// Expected: 1

console.log('Test 3 - get(obj, "a.b.c[1]"):', get(obj, 'a.b.c[1]'));
// Expected: 2

console.log('Test 4 - get(obj, "a.b.c[3]"):', get(obj, 'a.b.c[3]'));
// Expected: undefined

console.log('Test 5 - get(obj, "a.b.c[3]", "default"):', get(obj, 'a.b.c[3]', 'default'));
// Expected: "default"

// Additional test cases
const complexObj = {
    user: {
        name: 'John',
        address: {
            city: 'New York',
            coordinates: {
                lat: 40.7128,
                lng: -74.0060
            }
        },
        hobbies: ['reading', 'coding', 'gaming']
    }
};

console.log('\nAdditional Tests:');
console.log('Test 6 - get(complexObj, "user.name"):', get(complexObj, 'user.name'));
// Expected: "John"

console.log('Test 7 - get(complexObj, "user.address.coordinates.lat"):', get(complexObj, 'user.address.coordinates.lat'));
// Expected: 40.7128

console.log('Test 8 - get(complexObj, "user.hobbies[1]"):', get(complexObj, 'user.hobbies[1]'));
// Expected: "coding"

console.log('Test 9 - get(complexObj, ["user", "address", "city"]):', get(complexObj, ['user', 'address', 'city']));
// Expected: "New York"

console.log('Test 10 - get(complexObj, "user.phone", "N/A"):', get(complexObj, 'user.phone', 'N/A'));
// Expected: "N/A"

console.log('Test 11 - get(complexObj, "user.hobbies[10]"):', get(complexObj, 'user.hobbies[10]'));
// Expected: undefined

