console.log("Problem Statement: Arrays Group By");

const groupBy = <T>(arr: T[], keyFinder: ((x: T) => string | number) | keyof T) => {
    return arr.reduce((prev, cur)=> {
        const key = (typeof keyFinder === 'function' ? keyFinder(cur) : cur[keyFinder]) as string | number;
        if(!prev[key]){
            prev[key] = [cur]
        }else{
            prev[key] = [...(prev[key]), cur]
        }
        return prev;
    }, {} as Record<string | number, T[]>);
}

console.log(groupBy([6.1, 4.2, 6.3], Math.floor));
console.log(groupBy(["one", "two", "three"], "length"));
// Output:
// { 6: [6.1, 6.3], 4: [4.2] }
// { 3: ['one', 'two'], 5: ['three'] }