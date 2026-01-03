console.log('Problem Solving - Chop Array Into Chunks');

const chopArrayIntoChunks = <T>(arr: T[], chunkSize: number) : T[][] => {
    const choppedArrayResult: T[][] = [];
    let choppedArray: T[] = [];
    arr.forEach((item, index) => {
        if(choppedArray.length === chunkSize){
            choppedArrayResult.push(choppedArray);
            choppedArray = [];
        }
        choppedArray.push(item);
    });
    choppedArrayResult.push(choppedArray);
    choppedArray = []; // clear the chopped array
    return choppedArrayResult;
}

console.log(chopArrayIntoChunks([1,2,3,4,5,6,7,8,9,10], 3));