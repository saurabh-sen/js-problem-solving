console.log("Problem Statement: Method Chaining Calculator");

const calculator= {
    total: 0,
    add: function(n: number) {
        this.total += n;
        return this;
    },
    subtract: function(n: number) {
        this.total -= n;
        return this;
    },
    divide: function(n: number) {
        if(n === 0)throw 'Can not divide by 0'
        this.total /= n;
        return this;
    },
    multiply: function(n: number) {
        this.total *= n;
        return this;
    },
};

calculator.add(10).subtract(2).divide(2).multiply(5);
console.log(calculator.total);

type AmountCalculator = {
    value(this: AmountCalculator): number;
    lacs(this: AmountCalculator, n: number): AmountCalculator;
    crore(this: AmountCalculator, n: number): AmountCalculator;
    thousand(this: AmountCalculator, n: number): AmountCalculator;
};

function computeAmount(): AmountCalculator {
    let total = 0;

    // since giving type to this is not possible, we are using the type AmountCalculator for the this context.
    const api: AmountCalculator = {
        value: function(){
            console.log("total",total);
            return total;
        },
        lacs: function(n: number){
            const lacsN = n * 100000;
            total += lacsN;
            return api;
        },
        crore: function(n: number){
            const croreN = n * 10000000;
            total += croreN;
            return api;
        },
        thousand: function(n: number){
            const thousandN = n * 1000;
            total += thousandN;
            return api;
        },
    }
    return api;
};

computeAmount().lacs(15).crore(5).crore(2).lacs(20).thousand(45).crore(7).value();
computeAmount().lacs(15).value();
// 143545000