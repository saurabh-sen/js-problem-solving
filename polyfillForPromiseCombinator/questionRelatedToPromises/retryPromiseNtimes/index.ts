import { asyncTask } from '../../../createAsyncTask.ts'
console.log('Retry failed Promise n times');

const apiCall = asyncTask(2000, false, '2000 ms')

const wait = (ms: number) => new Promise((res, rej) => {
    setTimeout(() => {
        res(ms);
    }, ms);
})

const retryFailedApiCallsNTimesUsingAsyncAwait = async <T>(apiCall: (() => Promise<T>), delay: number, retries: number, failedMsg: string): Promise<T> => {
    try {
        if (retries <= 0) return Promise.reject(failedMsg);
        return await apiCall();
    } catch (error) {
        console.log('failed retrying')
        await wait(delay);
        return retryFailedApiCallsNTimesUsingAsyncAwait(apiCall, delay, --retries, failedMsg);
    }
}

const retryFailedApiCallsNTimesUsingThenCatch = <T>(apiCall: (() => Promise<T>), delay: number, retries: number, failedMsg: string): Promise<T> => {
    if(retries <= 0)return Promise.reject(failedMsg);
    return apiCall().then((val) => {
        return val;
    }).catch(() => {
        console.log('retrying....');
        return wait(delay).then(() => retryFailedApiCallsNTimesUsingThenCatch(apiCall, delay, --retries, failedMsg));
    })
}

// retryFailedApiCallsNTimesUsingAsyncAwait(apiCall, 1000, 3, "Failed after 3 retries")
//     .then(
//         (val) => console.log('value: ', val),
//         (er) => console.error('something went wrong: ', er)
//     );
retryFailedApiCallsNTimesUsingThenCatch(apiCall, 1000, 3, "Failed after 3 retries")
    .then(
        (val) => console.log('value: ', val),
        (er) => console.error('something went wrong: ', er)
    );