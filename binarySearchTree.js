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

    insert(value) {
        if (this.root === null) return new Node(value);

        let leaf = null;
        let current = this.root;

        while (current !== null) {

            leaf = current;
            if (value > current.data) {
                current = current.right;
            } else if ( value < current.data) {
                current = current.left;
            } else {
                return current;
            }

        }

        if (value > leaf.data) {
            leaf.right = new Node(value);
        } else if (value < leaf.data) {
            leaf.left = new Node(value);
        }

        return this.root;
    }

    deleteItem(value) {
        let current = this.root;
        let leaf = null;

        while (current !== null && current.data !== value) {
            leaf = current;
            if (value > current.data) {
                current = current.right;
            } else {
                current = current.left;
            }
        }

        //if we exit the while loop then that means current was the node we wanted or was equal to null
        //if it was equal to null, that means we didn't find the node we wanted and can just return the root

        if (current === null) {
            return this.root;
        }
        
        //if we reach this point, then current is the node we want to delete 
        //check if it has at most one child
        if (current.left === null || current.right === null) {
            let newCurr = (current.left === null) ? current.right : current.left;

            //if the leaf is still null, that means we never entered the while loop and the root is the node we want
            if (leaf === null) {
                return newCurr;
            }

            if (current === leaf.left) {
                leaf.left = newCurr;
            } else {
                leaf.right = newCurr;
            }
        } else {
            //if it has two children
            let n = null;
            let temp = current.right;
            while (temp.left !== null) {
                n = temp;
                temp = temp.left;
            }

            if (n !== null) {
                n.left = temp.right;
            } else {
                current.right = temp.right;
            }

            current.data = temp.data;
        }

        return this.root;
    }
    
    levelOrder(callback) {
        if (callback === undefined) throw new Error("Add a callback function!");

        const queue = [ this.root ];

        while (queue.length > 0) {
            const current = queue.shift();
            callback(current);

            if (current.left !== null) queue.push(current.left);
            if (current.right !== null) queue.push(current.right);
        }
    }

    preOrder() {
        const stack = [ this.root ];
        const ans = [];

        while (stack.length > 0) {
            const current = stack.pop();
            ans.push(current.data);
            // callback(current);

            if (current.right !== null) stack.push(current.right);
            if (current.left !== null) stack.push(current.left);
        }
        return ans;
    }

    inOrder() {
        const stack = [];
        const ans = [];
        let current = this.root;

        while (current !== null || stack.length > 0) {
            while (current !== null) {
                stack.push(current);
                current = current.left;
            }

            current = stack.pop();
            ans.push(current.data);

            current = current.right;
        }

        return ans;
    }

    //function to better visualize the tree
    prettyPrint(node, prefix = "", isLeft = true) {
        if (node === null) {
            return;
        }
        if (node.right !== null) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    }

}


let test = [1, 2, 3, 4, 5, 6];
let tree = new Tree(test);
console.log(tree.prettyPrint(tree.root));