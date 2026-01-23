/**
 * Find all elements in the DOM tree that have the given class name.
 * 
 * Example:
 * Input DOM:
 * <div class='a' id="root">
 *   <div class='b' id='b-1'>
 *     <div class='a' id='a-2'>
 *       <div class='d' id='d-1'></div>
 *     </div>
 *     <div class='c' id='c-1'>
 *       <div class='a' id='a-3'>
 *         <div class='d' id='d-2'></div>
 *       </div>
 *     </div>
 *   </div>
 * </div>
 * 
 * findByClass(document.getElementById('root'), 'a');
 * Output: [div#root, div#a-2, div#a-3]
 */

const dfs = (element: HTMLElement | null, result: HTMLElement[], targetClassName: string) => {
    const childList = element?.children;
    if (element?.classList.contains(targetClassName)) {
        result.push(element);
    }
    for (let i = 0; i < (childList?.length || 0); i++) {
        if(childList?.[i]) {
            dfs(childList?.[i] as HTMLElement, result, targetClassName);
        }
    }
}

// Find all elements with the given class name starting from a root element
const findByClass = (root: HTMLElement | null, className: string): HTMLElement[] => {
    if (!root) return [];
    const result: HTMLElement[] = [];
    dfs(root, result, className);
    return result;
};

// Handler function called when button is clicked
const handleFindByClass = () => {
    const root = document.getElementById('root');
    const className = 'a';
    
    const elements = findByClass(root, className);
    
    // Display results
    const resultDiv = document.getElementById('result');
    if (resultDiv) {
        const ids = elements.map(el => el.id).join(', ');
        resultDiv.innerHTML = `
            <strong>Found ${elements.length} elements with class '${className}':</strong>
            <br/>
            IDs: ${ids || 'None'}
        `;
    }
    
    console.log('Found elements:', elements);
};

// Expose to global scope for onclick handler
(window as any).handleFindByClass = handleFindByClass;

