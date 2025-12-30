console.log("Problem Statement: Clear All Timeout");

window.timeoutsId = [];
window.setTimout = (cb) => {
    const timeoutId = setTimeout(cb, 1000);
    window.timeoutsId.push(timeoutId);
    return timeoutId;
}

window.clearAllTimeouts = () => {
    window.timeoutsId.forEach(id => clearTimeout(id));
    window.timeoutsId = [];
}

setTimeout(() => {console.log("hello")}, 2000);
setTimeout(() => {console.log("hello1")}, 3000);
setTimeout(() => {console.log("hello2")}, 4000);
setTimeout(() => {console.log("hello3")}, 5000);
clearAllTimeouts();
setTimeout(() => {console.log("hello4")}, 5000);
// "hello4"