import { asyncTask } from '../../../createAsyncTask.ts'
console.log('execute Promise in Sequence');

const asyncTasksList: (() => Promise<string>)[] = [
    asyncTask(1000, true, '1000 ms'),
    asyncTask(2000, true, '2000 ms'),
    asyncTask(3000, true, '3000 ms'),
];

const executeAsyncTasksInSequenceUsingAsyncAwait = async (asyncTasksList: Promise<string>[]): Promise<string[]> => {
    try {
        const result: string[] = [];
        for (const promise of asyncTasksList) {
            const data = await promise;
            result.push(data);
        }
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const executeAsyncTasksInSequenceUsingReduce = async (asyncTasksList: Promise<string>[]): Promise<string[]> => {
    const result = asyncTasksList.reduce((result, promise) => {
        return result.then((data) => {
            return promise.then((val) => {
                data.push(val)
                return data;
            })
        })
    }, Promise.resolve([] as string[]))
    return result;
}

const executeAsyncTasksInSequenceUsingRecursion = async (asyncTasksList: (() => Promise<string>)[], result: string[]): Promise<string[]> => {
    const [promiseFunc, ...rest] = asyncTasksList;
    if (!promiseFunc) return result;
    return promiseFunc?.()?.then((val) => {
        result.push(val)
        if (rest.length === 0) return result;
        else return executeAsyncTasksInSequenceUsingRecursion(rest, result);
    });
}

// executeAsyncTasksInSequenceUsingAsyncAwait(asyncTasksList).then((val) => console.log('async tasks are:: ', val), (er) => console.error('something went wrong:: ', er));

// executeAsyncTasksInSequenceUsingReduce(asyncTasksList).then((val) => console.log('async tasks are:: ', val), (er) => console.error('something went wrong:: ', er));

// executeAsyncTasksInSequenceUsingRecursion(asyncTasksList, []).then((val) => console.log('async tasks are:: ', val), (er) => console.error('something went wrong:: ', er));