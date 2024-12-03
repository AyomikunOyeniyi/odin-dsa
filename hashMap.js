import { LinkedList } from "./linkedList";

class HashMap {
    constructor(capacity, loadFactor) {
        this.capacity = capacity;
        this.loadFactor = loadFactor;
        this.buckets = Array.from({ length: this.capacity }, () => new LinkedList);
        this.entries = []; //array to keep track of key value pairs
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
        //add the key value pair to the entries array
        this.entries.push([key, value]);
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

            //find the index of the key value pair in entries and remove the pair
            let pairIndex = this.entries.findIndex((element) => element[0] === key);
            this.entries.splice(pairIndex, 1);
        }

        return false;
    }

    length() {
        return this.keys.length
    }

    clear() {
        this.buckets = Array.from({ length: this.capacity }, () => new LinkedList);
        this.keys = [];
    }

    keys() {
        return this.entries.map((pair) => pair[0]);
    }

    values() {
        return this.entries.map((pair) => pair[1]);
    }
}