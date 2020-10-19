/**
 * @description This creates a new node for the linkedlist with value and initialize next to be null
 * @class Node
 */
class Node {
  constructor(value) {
    this.next = null;
    this.value = value;
  }
}

module.exports = Node;
