// get all the classList of the root element
const handleGetElementsByClassname = (classList) => {
    const root = document.querySelector('.root');
    const liveElements = [];

    const solve = (root) => {
        const classes = classList.trim().split(/\s+/);
        if (root.classList && classes.every(cls => root.classList.contains(cls))) {
            liveElements.push(root);
        }
        for (const item of root.children) {
            solve(item);
        }
    }
    solve(root)
    console.log('ans ', liveElements);
    return liveElements;
}