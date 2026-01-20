console.log('Problem Solving - Cached API Call');

type TApiCall = <T>(url: string, options?: RequestInit) => Promise<T>;

interface ICache {
    [key: string]: { value: any, expiryTime: Date }
}

const generateKey = (path: string, options: RequestInit) => {
    const key = Object.keys(options).sort((a, b) => a.localeCompare(b)).map(k => k + ':' + options[k].toString()).join('&');
    return path + key;
}

const makeApiCall = async (path: string, config: RequestInit) => {
    try {
        let response = await fetch(path, config);
        response = await response.json();
        return response;
    } catch (e) {
        console.log("error " + e);
    }
    return null;
};


const cachedApiCall = (ttl: number): TApiCall => {
    const cache: ICache = {};
    return async (url: string, options: RequestInit = {}) => {
        const key = generateKey(url, options);
        let entry = cache[key]
        try {
            if (!entry || Date.now() > entry?.expiryTime) {
                const value = await makeApiCall(url, options);
                cache[key] = { value, expiryTime: Date.now() + ttl };
            }
        }
        catch (e) {
            console.log("error " + e);
        }
        //return the cache
        return cache[key]?.value;
    };
}

const call = cachedApiCall(1500);

// first call
// an API call will be made and its response will be cached
call('https://jsonplaceholder.typicode.com/todos/1', {}).then((a) =>
    console.log(a)
);

// cached response will be returned
// it will be quick
setTimeout(() => {
    call('https://jsonplaceholder.typicode.com/todos/1', {}).then((a) =>
        console.log(a)
    );
}, 700);

// a fresh API call is made
// as time for cached entry is expired
setTimeout(() => {
    call('https://jsonplaceholder.typicode.com/todos/1', {}).then((a) =>
        console.log(a)
    );
}, 2000);

