console.log('Machine Coding - Digital Clock');

const pad = (item: number) => {
    return String(item).length > 1 ? `${item}` : `0${item}`
}

const clock = () => {
    const dateInMiliSec = new Date();
    const hour24 = dateInMiliSec.getHours();
    const minute = pad(dateInMiliSec.getMinutes());
    const second = pad(dateInMiliSec.getSeconds());

    const ampm = hour24 < 12 ? 'AM' : 'PM';
    let hour12 = hour24 % 12;
    hour12 = hour12 === 0 ? 12 : hour12;
    return `${hour12}:${minute}:${second} ${ampm}`
}

setInterval(function () {
    console.log(clock());
}, 1000);    