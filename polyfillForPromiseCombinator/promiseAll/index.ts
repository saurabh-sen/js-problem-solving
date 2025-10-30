import { asyncTask } from "../../createAsyncTask.ts";

console.log('polyfillForPromise.All');

// Fix: asyncTask returns a function that returns Promise<TVal>, so we need to call it
const asyncTasksList = [
    asyncTask(100, true, '100 ms'),
    asyncTask(300, true, '300 ms'),
    asyncTask(400, true, '400 ms'),
    asyncTask(500, true, '500 ms')
]

// Add the method to Promise interface
declare global {
    interface PromiseConstructor {
        myPromiseAll<T>(taskArray: (() => Promise<T>)[]): Promise<T[]>;
    }
}

Promise.myPromiseAll = function <T>(taskArray: (() => Promise<T>)[]): Promise<T[]> {
    return new Promise<T[]>((resolve, reject) => {
        const result: T[] = [];
        const n = taskArray.length;
        let completedPromise = 0;

        // Handle empty array case
        if (n === 0) {
            resolve(result);
            return;
        }

        for (const promise of taskArray) {
            Promise.resolve(promise()).then((res) => {
                result.push(res);
                ++completedPromise;
                if (completedPromise === n) {
                    resolve(result);
                }
            }).catch((er) => reject(er));
        }
    });
}

Promise.myPromiseAll(asyncTasksList).then((results) => {
    console.log('results ', results);
}).catch((error: Error) => {
    console.log('error ', error);
});