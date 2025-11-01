console.log('pausableTimer');

const timer = (val: number, step: number) => {
    let timerRef : null | NodeJS.Timeout = null;
    let result = val;
    const startTimer = () => {
        timerRef = setInterval(() => {
            val = val +  step;
            console.log("value is:", val)
        }, 1000);
    }
    const stopTimer = () => {
        if(timerRef)clearInterval(timerRef);
    }
    return {startTimer, stopTimer};
}

const { startTimer, stopTimer } = timer(10, 10);

startTimer();

setTimeout(() => {
    stopTimer()
    setTimeout(() => {
        startTimer()
    }, 4000);
}, 4000);

