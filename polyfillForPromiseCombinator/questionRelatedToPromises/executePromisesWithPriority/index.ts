import { asyncTask } from '../../../createAsyncTask.ts'
console.log('execute Promise with Priority');

type TAsyncTasksList<T> = {
    task: () => Promise<T>;
    priority: number;
}

const asyncTasksList: TAsyncTasksList<string>[] = [
    {task: asyncTask(1000, false, '1000 ms'), priority: 2},
    {task: asyncTask(2000, false, '2000 ms'), priority: 1},
    {task: asyncTask(3000, false, '3000 ms'), priority: 3},
];

const executePromisesWithPriority = <TVal>(tasks:  TAsyncTasksList<TVal>[], customError: string): Promise<TVal> => {
    return new Promise((res, rej) => {
        const n = tasks.length;
        let completedTasks = 0;
        const resolvedPromise: {val: TVal, priority: number}[] = [];
        for (const promise of tasks) {
            promise.task().then((val) => {
                resolvedPromise.push({val: val, priority: promise.priority});
                ++completedTasks;
                if(completedTasks === n){
                    if(resolvedPromise.length > 0){
                        resolvedPromise.sort((a, b) => a.priority - b.priority);
                        const result = resolvedPromise[0];
                        if (result) {
                            res(result.val);
                        } else {
                            rej(customError);
                        }
                    }else{
                        rej(customError);
                    }
                }
            }).catch((er) => {
                ++completedTasks;
                if(completedTasks === n){
                    if(resolvedPromise.length > 0){
                        resolvedPromise.sort((a, b) => a.priority - b.priority);
                        const result = resolvedPromise[0];
                        if (result) {
                            res(result.val);
                        } else {
                            rej(customError);
                        }
                    }else{
                        rej(customError);
                    }
                }
            })
        }
    })
};

executePromisesWithPriority(asyncTasksList, "someting went wrong")
.then((val) => console.log('result:', val))
.catch((er) => console.error('something went wrong:', er))