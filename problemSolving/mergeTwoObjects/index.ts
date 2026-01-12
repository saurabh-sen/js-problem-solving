console.log('Problem Solving - Merge Two Objects');

const mergeTwoObjects = (...args: IArguments[]) => {
    const merger = (target: Record<string, any>, obj: Record<string, any>) => {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (obj[key] && typeof obj[key] === 'object') {
                    target[key] = merger(target[key] || {}, obj[key]);
                } else {
                    target[key] = obj[key];
                }
            }
        }
        return target;
    }
    let result = {};
    for (const obj of args) {
        result = merger(result, obj);
    }
    return result;
}

// // TEST CASES:
const obj1 = {
    a: 1,
    b: 2,
    nested: {
        a1: 11,
        a2: 12,
        nested2: {
            a3: 13,
            a4: 14,
        },
    },
    c: 3
};
const obj2 = {
    d: 4,
    e: 5,
    f: 6,
    nested: {
        b1: 21,
        b2: 22,
        nested2: {
            b3: 23,
            b4: 24,
        },
    },
};
console.log(mergeTwoObjects(obj1, obj2));