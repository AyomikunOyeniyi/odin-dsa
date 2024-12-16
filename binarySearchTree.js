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

        const root = new Node(array[mid]);
        root.left = this.buildTree(array, start, mid - 1);
        root.right = this.buildTree(array, mid + 1, end);

        return root;
    }
}


let test = [1, 2, 3, 4, 5, 6];
let tree = new Tree(test);
console.log(tree.root);