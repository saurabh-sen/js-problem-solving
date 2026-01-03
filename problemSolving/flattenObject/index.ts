console.log('Problem Solving - Flatten Object');

interface IFlattenParam {
    [key:string] : string | number | Array<number> | IFlattenParam 
}

const flatten= (obj: IFlattenParam) => {}

const nested = {
    A: "12",
    B: 23,
    C: {
        P: 23,
        O: {
            L: 56
        },
        Q: [1, 2]
    }
};
console.log(flatten(nested));

// Output:
//     {
//     "A": "12"
//     "B": 23,
//     "C.O.L": 56,
//     "C.P": 23,
//     "C.Q.0": 1,
//     "C.Q.1": 2,
//     }