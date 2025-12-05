/**
 * Creates a toggle function that cycles through the provided arguments
 * @param args - The arguments to cycle through
 * @returns A function that returns the next argument in the cycle when called
 */
function toggle<T>(...args: T[]): () => T {
  let currentIndex = -1;
  
  return function(): T {
    currentIndex = (currentIndex + 1) % args.length;
    return args[currentIndex]!; // Non-null assertion since we know args is not empty
  };
}

// Create toggle instances
const hello = toggle("hello");
const onOff = toggle("on", "off");
const colors = toggle("red", "green", "blue");
const numbers = toggle(1, 2, 3, 4);
const mixed = toggle<boolean | string | number | null>(true, "hello", 42, null);

// Demo functions
function testSingleArg() {
  const result = hello();
  appendOutput('output1', `hello() → "${result}"`);
}

function testOnOff() {
  const result = onOff();
  appendOutput('output2', `onOff() → "${result}"`);
}

function testColors() {
  const result = colors();
  appendOutput('output3', `colors() → "${result}"`);
}

function testNumbers() {
  const result = numbers();
  appendOutput('output4', `numbers() → ${result}`);
}

function testMixed() {
  const result = mixed();
  const displayValue = result === null ? 'null' : 
                     typeof result === 'string' ? `"${result}"` : 
                     result;
  appendOutput('output5', `mixed() → ${displayValue} (${typeof result})`);
}

function appendOutput(elementId: string, text: string) {
  const output = document.getElementById(elementId);
  if(output) output.innerHTML += text + '<br>';
}

function clearOutput(elementId: string) {
  const output = document.getElementById(elementId);
  if(output) output.innerHTML = '';
}

// Example usage and testing
console.log('=== Toggle Function Examples ===');

// Example 1: Single argument (should always return the same value)
console.log('\n1. Single argument example:');
console.log('hello():', hello()); // "hello"
console.log('hello():', hello()); // "hello"
console.log('hello():', hello()); // "hello"

// Example 2: Two arguments (should alternate)
console.log('\n2. Two arguments example:');
console.log('onOff():', onOff()); // "on"
console.log('onOff():', onOff()); // "off"
console.log('onOff():', onOff()); // "on"
console.log('onOff():', onOff()); // "off"

// Example 3: Multiple arguments (should cycle through all)
console.log('\n3. Multiple arguments example:');
console.log('colors():', colors()); // "red"
console.log('colors():', colors()); // "green"
console.log('colors():', colors()); // "blue"
console.log('colors():', colors()); // "red" (cycles back)
console.log('colors():', colors()); // "green"

// Example 4: Numbers
console.log('\n4. Numbers example:');
console.log('numbers():', numbers()); // 1
console.log('numbers():', numbers()); // 2
console.log('numbers():', numbers()); // 3
console.log('numbers():', numbers()); // 4
console.log('numbers():', numbers()); // 1 (cycles back)

// Example 5: Mixed types
console.log('\n5. Mixed types example:');
console.log('mixed():', mixed()); // true
console.log('mixed():', mixed()); // "hello"
console.log('mixed():', mixed()); // 42
console.log('mixed():', mixed()); // null
console.log('mixed():', mixed()); // true (cycles back)

// Export for use in other files
export { toggle };
