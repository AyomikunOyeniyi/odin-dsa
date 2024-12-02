export class LinkedList {
    constructor () {
        this.head = null;
        this.tail = null;
    }

    append(key, value) {
        let newNode = new Node(key, value);

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
            return;
        }

        this.tail.nextNode = newNode;
        this.tail = newNode;
    }

    prepend(key, value) {
        let newNode = new Node(key, value);

        if (!this.head) {
            this.head = newNode;
            return;
        }

        newNode.nextNode = this.head;
        this.head = newNode;
    }

    size() {
        let count = 0;
        let current = this.head;

        while (current !== null) {
            count++;
            current = current.nextNode;
        }

        return count;
    }

    head() {
        return this.head;
    }

    tail() {
        return this.tail;
    }

    at(index) {
        let count = 0;

        let current = this.head;

        while (current !== null) {
            if (count == index) {
                return current;
            }
            current = current.nextNode;
            count++;
        }

        return null;
    }

    pop() {
        this.tail = null;
    }

    contains(key) {
        let current = this.head;

        while (current !== null) {
            if (current.key === key) {
                return true;
            }
            current = current.nextNode;
        }

        return false;
    }

    find(key) {
        let count = 0;
        let current = this.head;

        while (current !== null) {
            if (current.key === key) {
                return count;
            }
            current = current.nextNode;
            count++;
        }

        return null;
    }

    toString() {
        let result = `( ${this.head.value} ) -> `;

        let current = this.head.nextNode;

        while (current !== null) {
            result += `( ${current.value} ) -> `;
            current = current.nextNode;
        }

        result += `null`;
        return result;
    }
}

class Node {
    constructor (key, value, nextNode) {
        this.key = key ?? null;
        this.value = value ?? null;
        this.nextNode = nextNode ?? null;
    }
}

let list = new LinkedList;
list.append(5);
list.append(46);
list.append(9);
list.prepend(3);

console.log(list.toString());
