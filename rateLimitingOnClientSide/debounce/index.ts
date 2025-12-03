// declare window: globalThis;
console.log('Rate Limiting on Client Side - Debounce');

// function debounce<T extends (...a: any[]) => void>(
//     func: T,
//     delay: number
// ){
//     let timeout: NodeJS.Timeout;
//     return function(this: ThisParameterType<T>, ...args: Parameters<T>){
//         const context = this;
//         clearTimeout(timeout);
//         timeout = setTimeout(() => {
//             func.apply(context, [args]);
//         }, delay);
//     }
// }

// const debouncedFunction = debounce(() => {
//     console.log('Debounced function called');
// }, 1000);

// debouncedFunction();
// debouncedFunction();
// debouncedFunction();
// debouncedFunction();
// debouncedFunction();
// debouncedFunction();
// setTimeout(debouncedFunction, 1000);

// debounce with callNow flag

function debounceWithCallNow<T extends (callNow?: boolean, ...args: any[]) => void>(callback: T, delay: number){
    let timerId: NodeJS.Timeout | undefined;
    return function(this: ThisParameterType<T>, callNow = false, ...args: Parameters<T>){
        const shouldCallFunction = callNow && !timerId;
        clearTimeout(timerId);
        if(shouldCallFunction){
            callback.apply(this, [callNow, ...args]);
            timerId = undefined;
        }else{
            timerId = setTimeout(() => {
                callback.apply(this, [callNow, ...args]);
                timerId = undefined;
            }, delay);
        }
    }
}

const debouncedWithCallNowFunction = debounceWithCallNow((callNow?: boolean) => {
    console.log('Debounced function called',  callNow ? 'callnow k saath' : 'without callnow');
}, 1000);

debouncedWithCallNowFunction();
debouncedWithCallNowFunction();
debouncedWithCallNowFunction();
debouncedWithCallNowFunction();
debouncedWithCallNowFunction();
debouncedWithCallNowFunction();
setTimeout(() => {
    debouncedWithCallNowFunction();
    debouncedWithCallNowFunction(true);
}, 1000)