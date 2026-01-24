/**
 * Write a function getByClassNameHierarchy() that takes a path of class
 * names as input and returns an array of the last elements of that path.
 * 
 * Example:
 * Input DOM:
 * <div class="a" id="a-1">
 *   <div class="b" id="b-1">
 *     <div class="c" id="c-1"></div>
 *     <div class="c" id="c-2"></div>
 *   </div>
 *   <div class="c" id="c-3"></div>
 * </div>
 * 
 * getByClassNameHierarchy("a>b>c");
 * 
 * Output: [div#c-1, div#c-2]
 * 
 * Note: div#c-3 is NOT included because it's directly inside 'a', 
 * not following the path a > b > c
 */

const dfs = (element: HTMLElement | null, index: number, result: HTMLElement[], pathArr: string[]) => {
    if (!element) return;
    if (index + 1 === pathArr.length && pathArr[index] && element?.classList.contains(pathArr[index])) {
        result.push(element);
    }
    const currentClass = pathArr[index];
    if (currentClass) {
        if (element?.classList.contains(currentClass)) {
            const children = element?.children;
            if (!children) return;
            for (let i = 0; i < children.length; i++) {
                const element = children[i];
                if(!element)continue;
                dfs(element, index + 1, result, pathArr);
            }
        }
    }
}

// Find all elements that match the given class name hierarchy path
const getByClassNameHierarchy = (root: HTMLElement | null, path: string): HTMLElement[] => {
    // TODO: Implement the solution
    // Hint: 
    // 1. Parse the path string (e.g., "a>b>c") into an array of class names
    // 2. Start from document and find elements matching the hierarchy
    // 3. Only return elements that match the complete path
    const pathArr = path.split('>');
    const result: HTMLElement[] = [];
    dfs(root, 0, result, pathArr);
    return result;
};

// Handler function called when button is clicked
const handleGetByClassNameHierarchy = () => {
    const path = 'a>b>c';
    const root = document.getElementById('root');
    const elements = getByClassNameHierarchy(root, path);

    // Display results
    const resultDiv = document.getElementById('result');
    if (resultDiv) {
        const ids = elements.map(el => el.id).join(', ');
        resultDiv.innerHTML = `
            <strong>Found ${elements.length} elements matching path '${path}':</strong>
            <br/>
            IDs: ${ids || 'None'}
            <br/><br/>
            <em>Expected: c-1, c-2 (NOT c-3 because it doesn't follow a>b>c path)</em>
        `;
    }

    console.log('Found elements:', elements);
};

// Expose to global scope for onclick handler
(window as any).handleGetByClassNameHierarchy = handleGetByClassNameHierarchy;

