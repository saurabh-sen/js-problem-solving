import { asyncTask } from '../../../createAsyncTask.ts'
console.log('execute Promise in Parallel');

const asyncTasksList = [
    asyncTask(2000, true, '200 ms'), 
    asyncTask(1000, false, '100 ms'), 
    asyncTask(3000, true, '300 ms'), 
    asyncTask(4000, true, '400 ms')
];

const executeAsyncTasksInParallel = <T>(tasks: (() => Promise<T>)[]): Promise<T[]> => {
    return new Promise((res) => {
        let completedPromise = 0;
        const result: T[] = [];
        const n = tasks.length;
        for (let i = 0; i < n; i++) {
            const promise = tasks[i];
            if(promise === undefined)continue;
            promise().then((val) => {
                result[i] = val;
                ++completedPromise;
                if(completedPromise === n)res(result);
            }, (er) => {
                result[i] = er;
                ++completedPromise;
                if(completedPromise === n)res(result);
            });
        }
    })
}

executeAsyncTasksInParallel(asyncTasksList).then((val) => console.log('value: ', val), (er) => console.error('something went wrong: ', er));