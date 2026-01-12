/**
 * Browser History Implementation
 * 
 * Implement a browser history system with the following methods:
 * 
 * visit(url: string): void
 *   - Navigate to a new URL and clear forward history
 * 
 * current(): string
 *   - Return the current URL
 * 
 * back(steps?: number): string
 *   - Navigate back by steps (default: 1), return current URL
 * 
 * forward(steps?: number): string
 *   - Navigate forward by steps (default: 1), return current URL
 */

console.log('Browser History');

class BrowserHistory {
    browserHistory: string[] = [];
    currentPage = -1;
    constructor(){};

    public visit(url: string){
        this.browserHistory[++this.currentPage] = url
    }

    public current(){
        return this.browserHistory[this.currentPage];
    }

    public backward(steps: number = 1){
        this.currentPage = Math.max(0, this.currentPage - steps);
        return this.browserHistory[this.currentPage];
    }

    public forward(steps: number = 1){
        this.currentPage = Math.min(this.currentPage + steps, this.browserHistory.length - 1);
        return this.browserHistory[this.currentPage];
    }
}

const bh = new BrowserHistory();
bh.visit('A');
console.log(bh.current());
bh.visit('B');
console.log(bh.current());
bh.visit('C');
console.log(bh.current());
bh.backward();
console.log(bh.current());
bh.visit('D');
console.log(bh.current());
bh.backward();
console.log(bh.current());
bh.forward();
console.log(bh.current());
// Output:
// "A"
// "B"
// "C"
// "B"
// "D"
// "B"
// "D"
