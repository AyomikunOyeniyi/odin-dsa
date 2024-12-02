export class LinkedList {
    constructor () {
        this.head = null;
        this.tail = null;
    }

    append(value) {
        let newNode = new Node(value);

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
            return;
        }

        this.tail.nextNode = newNode;
        this.tail = newNode;
    }

    prepend(value) {
        let newNode = new Node(value);

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

    contains(value) {
        let current = this.head;

        while (current !== null) {
            if (current.value === value) {
                return true;
            }
            current = current.nextNode;
        }

        return false;
    }

    find(value) {
        let count = 0;
        let current = this.head;

        while (current !== null) {
            if (current.value === value) {
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

export class Node {
    constructor (value, nextNode) {
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
