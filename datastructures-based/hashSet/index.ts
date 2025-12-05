console.log('Data Structures and Algorithms - HashSet Implementation');

interface IStore {
    [key: string]: number;
}

class Store {
    private store: IStore;

    constructor() {
        this.store = {};
    }

    public set(key: string, value: number) {
        this.store[key] = value;
    }

    public get(key: string) {
        return this.store[key];
    }

    public has(key: string) {
        return key in this.store;
    }

    public delete(key: string) {
        delete this.store[key];
    }
}

// test cases
const store = new Store();
store.set('a', 10);
store.set('b', 20);
store.set('c', 30);
console.log(store.get('b')); // 20
console.log(store.has('c')); // true
