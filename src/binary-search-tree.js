const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
	constructor() {
		this.rootNode = null;
	}

	root() {
		return this.rootNode;
	}

	add(data) {
		this.rootNode = addWithin(this.rootNode, data);

		function addWithin(node, data) {
			if (!node) return new Node(data);

			if (node.data === data) return node;

			if (data < node.data) {
				node.left = addWithin(node.left, data);
			}
			else {
				node.right = addWithin(node.right, data);
			}

			return node;
		}
	}

	find(data) {
		return searchWithin(this.rootNode, data);

		function searchWithin(node, data) {
			if (!node) return null;

			if (node.data === data) return node;

			if (data < node.data) {
				return searchWithin(node.left, data);
			}
			else {
				return searchWithin(node.right, data);
			}
		}
	}

	has(data) {
		return !!this.find(data);
	}

	remove(data) {
		this.rootNode = removeWithin(this.rootNode, data);

		function removeWithin(node, data) {
			if (!node) return null;

			if (data < node.data) {
				node.left = removeWithin(node.left, data);
				return node;
			}
			else if (data > node.data) {
				node.right = removeWithin(node.right, data);
				return node;
			}
			else {
				if (!node.left && !node.right) return null;

				if (!node.left) {
					node = node.right;
					return node;
				}

				if (!node.right) {
					node = node.left;
					return node;
				}

				let maxFromLeft = node.left;
				while (maxFromLeft.right) {
					maxFromLeft = maxFromLeft.right;
				}
				node.data = maxFromLeft.data;

				node.left = removeWithin(node.left, maxFromLeft.data);

				return node;
			}
		}
	}

	max() {
		let node = this.rootNode;

		if (!node) return null;

		while (node.right) node = node.right;

		return node.data;
	}

	min() {
		let node = this.rootNode;

		if (!node) return null;

		while (node.left) node = node.left;

		return node.data;
	}
}

module.exports = {
	BinarySearchTree
};