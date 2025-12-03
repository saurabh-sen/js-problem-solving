console.log('Rate Limiting on Client Side - Throttle');

// incomplete implementation

function throttle<T extends (...a: any[]) => void>(callback: T, delay: number){
    let timerId: NodeJS.Timeout | undefined;
    let lastCall: number;
    return function(this: ThisParameterType<T>, ...args: Parameters<T>){
        clearTimeout(timerId);
        if(Date.now() - lastCall >= delay){
            callback.apply(this, args);
            timerId = undefined;
        }else{
            timerId = setTimeout(() => callback.apply(this, args), delay);
            timerId = undefined;
            lastCall = Date.now();
        }
    }
}

const throttledFunction = throttle(() => {
    console.log('Throttled function called');
}, 1000);


window.addEventListener('mousemove', throttledFunction);