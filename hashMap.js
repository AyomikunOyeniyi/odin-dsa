import { LinkedList } from "./linkedList";

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

        let bucket = this.buckets[index];
        if (bucket.contains(key)) {
            //if the key already exists, find and update the value of the node
            let nodeIndex = bucket.find(key);
            let node = bucket.at(nodeIndex);
            node.value = value;
        }
        bucket.append(key, value);
    }

    get (key) {
        let index = this.hash(key);
        //check if index is valid before proceeding
        this.checkIndex(index, this.capacity);
        
        let bucket = this.buckets[index];
        if (bucket.contains(key)) {
            //if the key exists, find the node and return its value
            let nodeIndex = bucket.find(key);
            let node = bucket.at(nodeIndex);

            return node.value;
        }

        return null;
    }

    has(key) {
        let index = this.hash(key);
        //check if index is valid before proceeding
        this.checkIndex(index, this.capacity);

        let bucket = this.buckets[index];
        return bucket.contains(key);
    }

    remove(key) {
        let index = this.hash(key);
        //check if index is valid before proceeding
        this.checkIndex(index, this.capacity);

        let bucket = this.buckets[index];
        if (bucket.contains(key)) {
            let nodeIndex = bucket.find(key);
            bucket.removeNode(nodeIndex);
        }

        return false;
    }
}