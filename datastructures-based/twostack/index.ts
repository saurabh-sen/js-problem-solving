console.log('Data Structures and Algorithms - two stack');

class twoStacks {
    private size: number;
    private top1 : number;
    private top2 : number;
    private arr : string[];

    constructor(n: number){
        this.size = n;
        this.top1 = -1;
        this.top2 = n;
        this.arr = [];
    }
    public push1(item: string){
        if(this.top1 < this.top2 - 1){
            this.arr[++this.top1] = item;
        }else {
            console.log('stack overflow');
            return false;
        }
    }
    public push2(item: string){
        if(this.top1 < this.top2 - 1){
            this.arr[--this.top2] = item;
        }else{
            console.log('stack overflow');
            return false;
        }
    }
    public pop1(){
        if(this.top1 >= 0){
            return this.arr[this.top1--];
        }console.log('stack underflow')
    }
    public pop2(){
        if(this.top2 <= this.size - 1)return this.arr[this.top2++];
        console.log('stack underflow')
    }
}

// Input:
let stack = new twoStacks(10);
//push in first stack
stack.push1('stack1');
//push in second stack
stack.push2('stack2');
//pop from first stack
console.log(stack.pop1());
//pop from second stack
console.log(stack.pop2());
// Output:
// "stack1"
// "stack2"