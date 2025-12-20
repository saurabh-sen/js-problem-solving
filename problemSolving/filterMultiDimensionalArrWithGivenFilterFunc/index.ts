console.log("Problem Statement: Filter Multi Dimensional Array With Given Filter Function");

type NestedArray<T> = Array<T | NestedArray<T>>;

function isNestedArray<T>(value: unknown): value is NestedArray<T> {
    return Array.isArray(value);
}

function isValue<T>(value: T | NestedArray<T>): value is T {
    return !Array.isArray(value);
}

const filter = <T>(arr: NestedArray<T>, filterFn: (item: T) => boolean): (NestedArray<T> | T)[] => {
    const result: (NestedArray<T> | T)[] = [];
    for (const item of arr) {
        if (isNestedArray<T>(item)) {
            // recursivly call the function for inner arrays
            const out = filter(item, filterFn);
            result.push(out);
        } else if (isValue<T>(item)) {
            if (filterFn(item)) {
                result.push(item);
            }
        }
    }

    return result;
};

const countElementsFromArray = <T>(arr: NestedArray<T>, filterFn: (item: T) => boolean): number => {
    let ans = 0;
    for(const item of arr){
        if(isNestedArray(item)){
            ans += countElementsFromArray(item, filterFn);
        }else if(isValue(item)){
            if(filterFn(item))ans += 1;
        }
    }
    return ans;
}

// const arr = [[1, [2, [3, "foo", { a: 1, b: 2 }]], "bar"]];
const arr =  [[1, [2, [3, 4, "foo", { a: 1, b: 2 }]], "bar"]];
const cb = <T>(e: T) => typeof e === "number"
const filtered = filter(arr, cb);
const countElements = countElementsFromArray(arr, cb)
console.log(JSON.stringify(filtered), countElements);