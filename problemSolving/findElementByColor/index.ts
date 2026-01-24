/**
 * Find all elements with the given color property.
 * 
 * The color will be provided in any format like:
 * - Plain text (white)
 * - HEXA value (#fff or #ffffff)
 * - RGB value (rgb(255, 255, 255))
 * 
 * Example:
 * Input DOM:
 * <div id="root">
 *   <span style="color:#fff;">1</span>
 *   <span style="color:#eee;">2</span>
 *   <span style="color:white;">3</span>
 *   <span style="color:rgb(255, 255, 255);">4</span>
 * </div>
 * 
 * findElementByColor(document.getElementById('root'), 'rgb(255, 255, 255)');
 * 
 * Output:
 * [
 *   <span style="color:#fff;">1</span>,
 *   <span style="color:white;">3</span>,
 *   <span style="color:rgb(255, 255, 255);">4</span>
 * ]
 * 
 * Hints:
 * - You may need to normalize all color formats to a common format (e.g., RGB)
 * - Consider using getComputedStyle() to get the actual computed color value
 * - Handle edge cases like inherited colors
 */

// Helper function to normalize color to a standard format
const normalizeColor = (color: string): string => {
    // TODO: Implement color normalization
    // Convert any color format (hex, named, rgb) to a standard format for comparison
    const el = document.createElement('div');
    el.style.color = color;
    document.body.appendChild(el);
    const computedRGBA = getComputedStyle(el).color;
    document.body.removeChild(el)
    return computedRGBA;
};

const dfs = (element: HTMLElement | null, targetColor: string, result: HTMLElement[]) => {
    if (!element) return;
    if (element.style.color.length > 0) {
        const normalizedElementColor = normalizeColor(element.style.color);
        if (normalizedElementColor === targetColor) result.push(element);
    }
    const childrens = element.children;
    for (let i = 0; i < childrens.length; ++i) {
        const child = childrens[i];
        if (!child) continue;
        dfs(child as HTMLElement, targetColor, result);
    }
}

// Find all elements with the given color starting from a root element
const findElementByColor = (root: HTMLElement | null, color: string): HTMLElement[] => {
    const result: HTMLElement[] = [];
    if (!root) return result;
    const normalizedInputColor = normalizeColor(color)
    dfs(root, normalizedInputColor, result);
    return result;
};

// Handler function called when button is clicked
const handleFindByColor = () => {
    const root = document.getElementById('root');
    const targetColor = 'rgb(255, 255, 255)';

    const elements = findElementByColor(root, targetColor);

    // Display results
    const resultDiv = document.getElementById('result');
    if (resultDiv) {
        const contents = elements.map(el => el.outerHTML).join('<br/>');
        resultDiv.innerHTML = `
            <strong>Found ${elements.length} elements with color '${targetColor}':</strong>
            <br/><br/>
            ${contents || 'None'}
        `;
    }

    console.log('Found elements:', elements);
};

// Expose to global scope for onclick handler
(window as any).handleFindByColor = handleFindByColor;

// Test cases to verify your solution
const runTests = () => {
    console.log('--- Test Cases ---');

    const root = document.getElementById('root');

    // Test 1: Find white elements using rgb format
    const result1 = findElementByColor(root, 'rgb(255, 255, 255)');
    console.log('Test 1 - rgb(255, 255, 255):', result1.length === 3 ? 'PASS' : 'FAIL', result1);

    // Test 2: Find white elements using hex format
    const result2 = findElementByColor(root, '#ffffff');
    console.log('Test 2 - #ffffff:', result2.length === 3 ? 'PASS' : 'FAIL', result2);

    // Test 3: Find white elements using named color
    const result3 = findElementByColor(root, 'white');
    console.log('Test 3 - white:', result3.length === 3 ? 'PASS' : 'FAIL', result3);

    // Test 4: Find red elements
    const result4 = findElementByColor(root, 'red');
    console.log('Test 4 - red:', result4.length === 2 ? 'PASS' : 'FAIL', result4);

    // Test 5: Find black elements
    const result5 = findElementByColor(root, '#000000');
    console.log('Test 5 - #000000:', result5.length === 1 ? 'PASS' : 'FAIL', result5);
};

// Uncomment to run tests
document.addEventListener('DOMContentLoaded', runTests);

