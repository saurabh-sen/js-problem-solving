/**
 * Problem Statement:
 * Given a JSON as an object with type, children, and props of the
 * DOM element, write a function to convert the object to the actual DOM.
 */

interface DOMNode {
  type: string;
  props?: Record<string, string>;
  children?: string | DOMNode[];
}

const json: DOMNode[] = [
  {
    type: 'div',
    props: { id: 'hello', class: 'foo' },
    children: [
      { type: 'h1', children: 'HELLO' },
      {
        type: 'p',
        children: [
          { type: 'span', props: { class: 'bar' }, children: 'World' },
        ],
      },
    ],
  },
  {
    type: 'section',
    props: { id: 'hello-2', class: 'foo-2' },
    children: [
      { type: 'h1', children: 'HELLO-2' },
      {
        type: 'p',
        children: [
          { type: 'span', props: { class: 'bar-2' }, children: 'World' },
        ],
      },
    ],
  },
];

/**
 * Converts a single DOMNode object to an actual DOM element
 * @param node - The DOMNode object to convert
 * @returns The created HTMLElement
 */
function createDOMElement(node: DOMNode): HTMLElement {
  // TODO: Implement this function
  // 1. Create the element using node.type
  // 2. Apply props as attributes
  // 3. Handle children (can be string, single DOMNode, or array of DOMNodes)
  const element = document.createElement(node.type);
  // props handling
  if (node.props) {
    for (const key in node.props) {
      if (Object.prototype.hasOwnProperty.call(node.props, key)) {
        element.setAttribute(key, node.props[key] || '');
      }
    }
  }
  // children handling
  if (node.children) {
    if (Array.isArray(node.children)) {
      for (const child of node.children) {
        element.appendChild(createDOMElement(child));
      }
    } else {
      element.appendChild(document.createTextNode(node.children));
    }
  }
  return element;
}

/**
 * Converts an array of DOMNode objects to a DocumentFragment containing all DOM elements
 * @param jsonArray - Array of DOMNode objects
 * @returns DocumentFragment containing all created elements
 */
function JSONtoHTML(jsonArray: DOMNode[]): DocumentFragment {
  // TODO: Implement this function
  // 1. Create a DocumentFragment to hold all elements
  // 2. Iterate through jsonArray and create DOM elements
  // 3. Append each element to the fragment
  const fragment = document.createDocumentFragment();
  for (const entry of jsonArray) {
    const element = createDOMElement(entry);
    fragment.appendChild(element);
  }
  return fragment;
}

// Test the implementation
const result = JSONtoHTML(json);
console.log(result);

// Append to document body to visualize
const output = document.getElementById('output');
output?.appendChild(result);

