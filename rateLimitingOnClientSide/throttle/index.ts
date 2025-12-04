console.log('Rate Limiting on Client Side - Throttle');

// // simple implementation (bug it wont run the last function call);
// function throttle<T extends (...a: any[]) => void>(callback: T, delay: number) {
//     let lastCall: number = 0;
//     return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
//         if (Date.now() - lastCall >= delay) {
//             lastCall = Date.now();
//             callback.apply(this, args);
//         }
//     }
// }

// new version
const throttle = <T extends(...args: any[]) => void>(callback: T, limit: number) => {
    let lastFunc: NodeJS.Timeout | undefined;
    let lastCallDate: number = 0;
    return (...args: Parameters<T>) => {
        if(!lastCallDate){
            callback(...args);
            lastCallDate = Date.now();
        }else{
            clearTimeout(lastFunc);
            lastFunc = setTimeout(() => {
                if(Date.now() - lastCallDate >= limit){
                    callback(...args);
                    lastCallDate = Date.now();
                }
            }, limit - (Date.now() - lastCallDate));
        }
    }
}

const throttledFunction = throttle(() => {
    console.log('Throttled function called');
}, 1000);


window.addEventListener('mousemove', throttledFunction);