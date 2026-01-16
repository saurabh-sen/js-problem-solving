console.log("Problem Solving - JSON Stringify Polyfill");

class JSON1 {
    static stringify<T>(obj: T) {
        if (obj === null) return 'null';
        if (Array.isArray(obj)) {
            return this.value(obj);
        }
        this.resolveCircularRef(obj);
        if (typeof obj === 'object') {
            const keys = Object.keys(obj);
            let string = "";
            for (const key of keys) {
                string += `"${key}": ${typeof obj[key] === 'object' ? '{' + this.value(obj[key]) + '}' : this.value(obj[key])}, `
            }
            return `{${string.slice(0, -2)}}`;;
        }
        return `${obj}`
    };
    static value<T>(obj: T) {
        switch (typeof obj) {
            case 'function':
            case 'undefined':
            case 'symbol':
                return 'null';
            case 'number':
                return isFinite(obj) ? `${obj}` : `null`;
            case 'string':
                return `"${obj}"`;
            case 'boolean':
                return `${obj}`;
            case 'object': {
                if(obj instanceof Date){
                    return `"${obj.toISOString()}"`;
                }else if(obj instanceof String){
                    return `"${obj}"`;
                }else if(obj instanceof Number){
                    return isFinite(obj) ? `${obj}` : `null`;
                }else if(obj instanceof Boolean){
                    return `"${obj.toString()}"`;
                }else if(Array.isArray(obj)){
                    return `[${obj.map(item => this.value(item)).join(',')}]`;
                }
                return this.stringify(obj);
            }
        }
    };
    static resolveCircularRef<T>(param: T) {
        const set = new WeakSet([param]);
        const recursivelyCheckForCircularRef = <T>(obj: T) => {
            const keys = Object.keys(obj);
            for (const key of keys) {
                if(obj.hasOwnProperty(key)){
                    if(set.has(obj[key])){
                        delete obj[key];
                    }else{
                        if(typeof obj[key] === 'object'){
                            set.add(obj[key]);
                            recursivelyCheckForCircularRef(obj[key]);
                        }
                    }
                }
            }
        }
        recursivelyCheckForCircularRef(param);
    }
}

let obj1 = {
    a: 1,
    b: {
        c: 2,
        d: -3,
        e: {
            f: {
                g: -4,
            },
        },
        h: {
            i: 5,
            j: 6,
        },
    },
};

let obj2 = {
    a: 1,
    b: {
        c: 'helloworld',
        d: 2,
        e: {
            f: {
                g: -4,
            },
        },
        h: 'goodnightmoon',
    },
};


// const List = function (val) {
//     this.next = null;
//     this.val = val;
// };
// const item1 = new List(10);
// const item2 = new List(20);
// const item3 = new List(30);
// item1.next = item2;
// item2.next = item3;
// item3.next = item1;
// console.log(JSON1.stringify(item1));
// console.log(JSON1.stringify(obj1));
// console.log(JSON1.stringify(obj2));
// console.log(JSON1.stringify([{ x: 5, y: 6 }]));
// expected output: "[{"x":5,"y":6}]"
// console.log(JSON1.stringify([new Number(3), new String('false'), new Boolean(false), new Number(Infinity)]));
// // expected output: "[3,"false",false]"
// console.log(JSON1.stringify({
//     x: [10, undefined, function () { },
//         Symbol('')]
// }));
// expected output: "{"x":[10,null,null,null]}"
console.log(JSON1.stringify({ a: Infinity }));
// "{'a': null}"