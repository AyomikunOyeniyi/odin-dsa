import { LinkedList, Node } from "./linkedList";

class HashMap {
    constructor() {
        this.capacity = 16;
        this.loadFactor = 0.8;
        this.buckets = Array.from({ length: this.capacity }, () => new LinkedList);
    }

    //function to check if index is in the bucket (valid)
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
        let index = this.hash(key);
        //check if index is valid before proceeding
        this.checkIndex(index, this.capacity);
        this.buckets[index].append(value);
    }

    get (key) {
        let index = this.hash(key);
        //check if index is valid before proceeding
        this.checkIndex(index, this.capacity);

    }
}