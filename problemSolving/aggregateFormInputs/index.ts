console.log('Problem Solving - Aggregate Form Inputs');

const aggregateInputsByName = (wrapper: HTMLElement) => {
    const form = wrapper;
    const inputs = form.querySelectorAll('input');
    const inputNames:[string, string][] = [];
    inputs.forEach(node => inputNames.push([node.name, node.value]));
    return inputNames.reduce((prev, cur) => {
        const path = cur[0];
        const value = cur[1];
        const pathArr = path.split('.');
        const pathArrLen = pathArr.length;
        let shallowPrev: Record<string, any> = prev;
        for (let i = 0; i < pathArrLen-1; ++i) {
            const prop = pathArr[i] || "";
            if(!shallowPrev[prop]){
                shallowPrev[prop] = {};
            }
            shallowPrev = shallowPrev[prop];
        }
        shallowPrev[pathArr[pathArrLen-1] || ""] = value;
        return prev;
    }, {});
};

const form = document.getElementById('parent');

if (form) {
    const aggregated = aggregateInputsByName(form);
    console.log(aggregated);
}
// {
//     "a": {
//         "c": "1",
//         "b": {
//            "d": "2",
//            "e": "3"
//         }
//     }
// }

