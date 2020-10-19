const Node = require("./listNode");
const { getTimeDifference, now } = require("./time");

/**
 * @description this class is responsible for managing the data storage, retrieval and clearing of expired entries.
 * @class Linkedlist
 */
class LinkedList {
  constructor() {
    this.head = null;
  }


  /**
   * @description This method adds new entry to the linkedlist as head.
   * @memberOf  LinkedList
   * @param {string} key
   * @param {number} value
   * @param {Date} timestamp
   * @returns void
   */
  addElement({ key, value, timestamp }) {
    let newNode = new Node({ key, value, timestamp });
    let currHead = this.head;

    newNode.next = currHead;
    this.head = newNode;
  }


  /**
   * @description this method searches the entire list and returns the sum of all the value matching the key passed in
   * @memberOf LinkedList
   * @param {string} key
   * @returns {number} sum
   */
  getSumOfElement(key) {
    let currNode = this.head;
    let sum = 0;

    while (currNode) {
      if (currNode.value.key === key) {
        sum += currNode.value.value;
      }

      currNode = currNode.next;
    }

    return sum;
  }
  /**
   * @description This method is responsible for clearing all nodes found whenever the timestamp of any node is more than expiry time greater than the present time.
   * @param  {number} expiryTime
   */
  clearExpiredNodes(expiryTime) {
    let currNode = this.head;

    let prevNode = null;
    while (currNode) {
      if (getTimeDifference(now(), currNode.value.timestamp) >= expiryTime) {
        if (!prevNode) {
          this.head = null;
          return;
        }

        prevNode.next = null;
        return;
      }

      prevNode = currNode;
      currNode = currNode.next;
    }
  }
}

module.exports = LinkedList;
