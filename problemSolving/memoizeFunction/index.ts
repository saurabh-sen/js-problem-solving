console.log('memoizer function');

type AnyFn = (...args: any[]) => any;

// learned new concept of typescript, ReturnType<T> is a built in type that returns the return type of the function T.

const memoize = <T extends AnyFn>(callback: T) => {
    const cache: Record<string, any> = {};
    return (...args: Parameters<T>): ReturnType<T> => {
        const stringArgs = JSON.stringify(args);
        console.log("stringArgs",stringArgs, cache);
        if(stringArgs in cache) return cache[stringArgs];
        else {
            cache[stringArgs] = callback(...args);
            return cache[stringArgs];
        }
    };
};

const factorial = (n: number): number => {
    let count = 0;
    for(let i = 0; i <1000000000;++i){++count};
    return count+n;
};
const memoizedFactorial = memoize(factorial);
let a = memoizedFactorial(100) // first call, slow
console.log("a value",a);
let b = memoizedFactorial(100) // cached call, faster
console.log("b value",b);
