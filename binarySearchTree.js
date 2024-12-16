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

    //implement find method with breadth first search
    find(value) {
        //initialize a queue with the root node
        const queue = [ this.root ];

        //keep iterating through the queue while there are elements in it
        while (queue.length > 0) {
            const current = queue.shift();
            if (current.data === value) {
                return current;
            }

            //push its children if it has any. this also means it doesn't add elements when it encounters a leaf
            if (current.left !== null) queue.push(current.left);
            if (current.right !== null) queue.push(current.right);
        }

        return null;
    }
}


let test = [1, 2, 3, 4, 5, 6];
let tree = new Tree(test);
console.log(tree.find(3));