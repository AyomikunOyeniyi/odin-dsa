import { LinkedList } from "./linkedList";

class HashMap {
    constructor(capacity, loadFactor) {
        this.capacity = capacity;
        this.loadFactor = loadFactor;
        this.buckets = Array.from({ length: this.capacity }, () => new LinkedList);
        this.keys = []; //array to store keys
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
        //add the key to the keys array
        this.keys.push(key);
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
            //find the index of the key in the keys array, then remove it
            let keyIndex = this.keys.findIndex((element) => element === key);
            this.keys.splice(keyIndex, 1);
            bucket.removeNode(nodeIndex);
        }

        return false;
    }

    length() {

    }
}