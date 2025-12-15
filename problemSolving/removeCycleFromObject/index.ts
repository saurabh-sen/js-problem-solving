console.log("Problem Statement: Remove cycle from object");

const removeCycleFromObj = (obj: Record<string, any>) => {
    const set = new WeakSet<object>([obj]);

    const iterateOnObj = (nodes: Record<string, any>) => {
        for (const key of Object.keys(nodes)) {
            const node = nodes[key];

            if (typeof node === 'object' && node !== null) {
                if (set.has(node)) {
                    delete nodes[key];
                } else {
                    set.add(node);
                    iterateOnObj(node);
                }
            }
        }
    };

    iterateOnObj(obj);
};

const List = function <T>(val: T) {
    this.next = null;
    this.val = val;
};

const item1 = new List(10);
const item2 = new List(20);
const item3 = new List(30);
item1.next = item2;
item2.next = item3;
item3.next = item1;

console.log(item1);

removeCycleFromObj(item1);
console.log("after remvoing cycle", item1);