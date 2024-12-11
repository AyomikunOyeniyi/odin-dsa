class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(array) {
        this.array = array;
        this.root = this.buildTree(this.array);
    }

    buildTree(array, start = 0, end = array.length - 1) {
        if (start > end) return null;
        const mid = Math.floor((start + end) / 2);

        const root = array[mid];
        root.left = this.buildTree(array, start, mid - 1);
        root.right = this.buildTree(array, mid + 1, end);

        return root;
    }
}

const a = new Node(1);
const b = new Node(2);
const c = new Node(3);
const d = new Node(4);
const e = new Node(5);
const f = new Node(6);

let test = [a, b, c, d, e, f];
let tree = new Tree(test);
console.log(tree.root);