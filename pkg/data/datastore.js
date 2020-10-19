require("dotenv").config();
const LinkedList = require("./linkedList");
const { now, oneHourInSeconds } = require("./time");

const expiryTimeInSeconds = process.env.TIMETOEXPIRE || oneHourInSeconds;
/**
 * @class DataStore
 * @description This creates a new datastore instance if there is no existing datastore instance
 *
 */
class DataStore {
  constructor() {
    if (!DataStore.instance) {
      this.entries = [];
      DataStore.instance = this;
      this.linkedlist = new LinkedList();
    }

    return DataStore.instance;
  }
  /**
   * @description This adds a new entry to the datastore and clear any expired entries before it starts adding the entry
   * @param  {string} key
   * @param {Number} value
   * @memberof DataStore
   */
  addEntry({ key, value }) {
    // clear expired entries
    this.linkedlist.clearExpiredNodes(expiryTimeInSeconds);
    this.linkedlist.addElement({ key, value, timestamp: now() });
  }

  /**
   * @description This clears any oldExpiredEntry and returns the sum of the value for the entry with the given key
   * @param  {string} key
   */
  getSum(key) {
    // clear expired entries
    this.linkedlist.clearExpiredNodes(expiryTimeInSeconds);
    return this.linkedlist.getSumOfElement(key);
  }
}

const instance = new DataStore();
Object.freeze(instance);

module.exports = instance;
