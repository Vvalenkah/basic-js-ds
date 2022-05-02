const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}
class BinarySearchTree {

    constructor() {
        this.root = null;
    }

    add(data) {
        this.root = addData(this.root, data);

        function addData(node, data) {
            if (!node) {
                return new Node(data);
            }
            if (node.data === data) {
                return node;
            }
            if (data < node.data) {
                node.left = addData(node.left, data);
            } else {
                node.right = addData(node.right, data);
            }
            return node;
        }
    }

    has(data) {
        return searchData(this.root, data);

        function searchData(node, data) {
            if (!node) {
                return false;
            }
            if (node.data === data) {
                return true;
            }
            return data < node.data ?
                searchData(node.left, data) :
                searchData(node.right, data);
        }
    }

    find(data) {
        return findData(this.root, data);

        function findData(node, data) {
            if (!node) {
                return false;
            }
            if (node.data === data) {
                return node.data;
            }
            return data < node.data ?
                findData(node.left, data) :
                findData(node.right, data);
        }
    }

    remove(data) {
        this.root = removeNode(this.root, data);

        function removeNode(node, data) {
            if (!node) {
                return null;
            }
            if (data < node.data) {
                node.left = removeNode(node.left, data);
                return node;
            } else if (node.data < data) {
                node.right = removeNode(node.right, data);
                return node;
            } else {
                if (!node.left && !node.right) {
                    return null;
                }
                if (!node.left) {
                    node = node.right;
                    return node;
                }
                if (!node.right) {
                    node = node.left;
                    return node;
                }
                let minFromRight = node.right;
                while (minFromRight.left) {
                    minFromRight = minFromRight.left;
                }
                node.data = minFromRight.data;
                node.right = removeNode(node.right, minFromRight.data);
                return node;
            }
        }
    }

    min() {
        if (!this.root) {
            return;
        }
        let node = this.root;
        while (node.left) {
            node = node.left;
        }
        return node.data;
    }

    max() {
        if (!this.root) {
            return;
        }
        let node = this.root;
        while (node.right) {
            node = node.right;
        }
        return node.data;
    }
}

module.exports = {
    BinarySearchTree
};