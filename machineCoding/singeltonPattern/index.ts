/**
 * Singleton Pattern Implementation
 * 
 * Implement a singleton pattern with the following methods:
 * 
 * getInstance(): Singleton
 *   - Return the singleton instance
 */

console.log('Singleton Pattern');

class Singleton {
    private static instance: Singleton | null = null;
    private constructor() {}
    public static getInstance(): Singleton {
        if(!this.instance){
            this.instance  = new Singleton();    
        }
        return this.instance;
    }
}

// const singleton = new Singleton();

const object1 = Singleton.getInstance();
const object2 = Singleton.getInstance();
console.log(object1 === object2); //true