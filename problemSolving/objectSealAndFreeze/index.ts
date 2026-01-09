console.log('object deeply seal and freeze');

const deepSeal = (obj: Record<string, any>) => {
    const keys = Object.getOwnPropertyNames(obj);
    keys.forEach(key => {
        const value = obj[key];
        // if value if falsy then return the value else check if value is an object then recursively call the function else return the value.
        obj[key] = value && typeof value === 'object' ? deepSeal(value) : value;
    });
    return Object.seal(obj);
};

const obj = {
    prop: 42,
    nested: {
        a: 1,
        b: 3,
    }
};

// OBJECT.SEAL() : in seal, we can update but no delete, no add on first level of the object, but can update the nested objects.
// Object.seal(obj);
// obj.nested.a = 2;
// delete obj.nested.a;
// obj.nested.c = 4;
// console.log(obj)
// // output:
// // { prop: 42, nested: { b: 3, c: 4 } }

// to deeply seal the object, we need to use a recursive function to seal the nested objects.
// deepSeal(obj);
// obj.nested.a = 2;
// // delete obj.nested.a; // error
// // obj.nested.c = 4; // error
// console.log(obj)
// // output: 
// // { prop: 42, nested: { a: 1, b: 3, c: undefined, d: null, e: false, f: true, g: 0 } }


// // OBJECT.FREEZE() : in freeze, no update, no delete, no add on first level of the object, but can update the nested objects.
// Object.freeze(obj);
// obj.nested.a = 2;
// delete obj.nested.a;
// obj.nested.c = 4;
// obj.prop = 43; // error
// delete obj.prop; // error
// console.log(obj)
// // output:
// // { prop: 42, nested: { b: 3 } }

const deeplyFreeze = (obj: Record<string, any>) => {
    const keys = Object.getOwnPropertyNames(obj);
    keys.forEach(key => {
        const value = obj[key];
        obj[key] = value && typeof value  === 'object' ? deeplyFreeze(value) : value;
    });
    return Object.freeze(obj);
}

// // TEST CASE:
// deeplyFreeze(obj);
// // obj.nested.a = 34; // error
// // delete obj.nested.b; // error
// obj.nested.c = 34 // error object is not extensible
// console.log(obj);