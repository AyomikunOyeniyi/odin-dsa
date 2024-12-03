import { LinkedList } from "./linkedList.js";

class HashMap {
    constructor(capacity, loadFactor) {
        this.capacity = capacity;
        this.loadFactor = loadFactor;
        this.buckets = Array.from({ length: this.capacity }, () => new LinkedList());
        this.entries = []; //array to keep track of key value pairs
    }

    //function to check if index is in the bucket (valid)
    checkIndex(index) {
        console.log('checking the index');
        if (index < 0 || index >= this.capacity) {
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

    checkBucketSize() {
        let num = this.loadFactor * this.capacity;
        return num;
    }

    growBuckets() {
        //copy the entries, clear the buckets and increase the size
        let oldEntries = this.entries.map((pairs) => [...pairs]);
        this.clear();

        this.capacity *= 2;
        oldEntries.forEach((pair) => this.set(pair[0], pair[1]));
    }

    set (key, value) {
        let index = this.hash(key);
        console.log(this.hash('moon'))
        //check if index is valid before proceeding
        this.checkIndex(index);

        let bucket = this.buckets[index];
        console.log(index);
        console.log(`Bucket: ${bucket}`);
        if (bucket.contains(key)) {
            // console.log(`Key ${key} already exists! Updating value.`);
            //if the key already exists, find and update the value of the node
            let nodeIndex = bucket.find(key);
            let node = bucket.at(nodeIndex);
            node.value = value;

            //update the entry in the entries array
            let pairIndex = this.entries.findIndex((element) => element[0] === key);
            this.entries[pairIndex][1] = value;
        } else {
            // console.log(`Key ${key} doesn't exist. Appending new key.`);
            //add the key value pair to the entries array
            this.entries.push([key, value]);

            if (this.entries.length > this.checkBucketSize()) {
                this.growBuckets();
                console.log('Growing...');
            }

            bucket.append(key, value);
        }
        
        
    }

    get (key) {
        let index = this.hash(key);
        //check if index is valid before proceeding
        this.checkIndex(index);
        
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
            return true;
        }

        return false;
    }

    length() {
        return this.entries.length
    }

    clear() {
        this.buckets = Array.from({ length: this.capacity }, () => new LinkedList);
        this.entries = [];
    }

    keys() {
        return this.entries.map((pair) => pair[0]);
    }

    values() {
        return this.entries.map((pair) => pair[1]);
    }
    
    getEntries() {
        return this.entries;
    }
}

const test = new HashMap(16, 0.75);
 test.set('apple', 'red')
 test.set('banana', 'yellow')
 test.set('carrot', 'orange')
 test.set('dog', 'brown')
 test.set('elephant', 'gray')
 test.set('frog', 'green')
 test.set('grape', 'purple')
 test.set('hat', 'black')
 test.set('ice cream', 'white')
 test.set('jacket', 'blue')
 test.set('kite', 'pink')
 test.set('lion', 'golden')
 test.set('moon', 'silver')
//  test.set('moon', 'black')
// test.set('random', 'stuff')
// test.set('please', 'grow')
// test.set('joor', 'nau')
// console.log(test.hash('moon'));
// console.log(test.entries);
// console.log(test.buckets);
