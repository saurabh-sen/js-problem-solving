/**
 * Problem Statement:
 * Write a function that takes a DOM node as input and converts it to a
 * JavaScript object. The object should have the type of node, its
 * attributes, and all the children.
 */

interface JSONNode {
  type: string;
  props?: Record<string, string>;
  children?: string | JSONNode | JSONNode[];
}

const getAttributes = (node: Element): Record<string, string> => {
  const result: Record<string, string> = {};
  const attrs = node.attributes;
  for (const att in attrs) {
    if (Object.prototype.hasOwnProperty.call(attrs, att)) {
      const element = attrs[att];
      if (element) {
        result[element.nodeName] = element.value;
      }
    }
  }
  return result;
}

const dfs = (node: Element): JSONNode => {
  if(!node) return {} as JSONNode;
  const nodeType = node.tagName;
  const attributes = getAttributes(node);
  const children = Array.from(node?.children || []);
  const result: JSONNode = {
    type: nodeType,
    props: attributes,
    children: '',
  };

  if(children.length === 1){
    result.children = dfs(children[0] as Element);
  }else if(children.length > 1){
    result.children = children.map(child => dfs(child));
  } else {
    result.children = node.textContent || '';
  }
  return result;
}

/**
 * Converts a DOM element to a JSON object representation
 * @param node - The DOM element to convert
 * @returns JSONNode object representing the DOM structure
 */
function HTMLtoJSON(node: Element): JSONNode {
  // TODO: Implement this function
  // 1. Get the node's tag name (type)
  // 2. Extract all attributes into props object
  // 3. Handle children:
  //    - If only text content, return as string
  //    - If single child element, return as JSONNode
  //    - If multiple children, return as array of JSONNodes
  // 4. Handle text nodes vs element nodes
  // const result: JSONNode = {};
  return dfs(node);
}

// Get the test element and convert it
const node = document.getElementById('foo');

if (node) {
  const result = HTMLtoJSON(node);
  console.log(result);
  console.log(JSON.stringify(result, null, 2));
}

