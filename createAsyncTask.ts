/*
    createAsyncTask is a function that creates a promise that resolves or rejects after a given delay.
    @param delay: number - the delay in milliseconds
    @param shouldResolve: boolean - if true, the promise will resolve, otherwise it will reject
    @param val: any - resolve or rejected value
    @returns: Promise - a promise that resolves or rejects after a given delay
*/
export const asyncTask = <TVal>(delay: number, shouldResolve: boolean, val: TVal) => {
    return () => new Promise<TVal>((res, rej) => {
        setTimeout(() => {
            if(shouldResolve)res(val);
            else rej(val);
        }, delay);
    })
}