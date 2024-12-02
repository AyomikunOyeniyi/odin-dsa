import { LinkedList, Node } from "./linkedList";

class HashMap {
    constructor() {
        this.capacity = 16;
        this.loadFactor = 0.8;
        this.buckets = Array.from({ length: this.capacity }, () => new LinkedList);
    }

    checkIndex(index, bucketsLength) {
        if (index < 0 || index >= bucketsLength) {
            throw new Error("Trying to access index out of bounds");
        }
    }

    hash(key) {
        let hashCode = 0;
            
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }

        return hashCode;
    } 

    set (key, value) {

    }

    get (key) {
        let index = this.hash(key);
        
    }
}