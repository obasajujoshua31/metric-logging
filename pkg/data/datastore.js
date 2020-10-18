require("dotenv").config();
const { now } = require("./time");
const clearExpiredEntries = require("./util");

const expiryTimeInSeconds = process.env.TIMETOEXPIRE || 3600;
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
    clearExpiredEntries(this.entries, expiryTimeInSeconds);
    this.entries.unshift({ key, value, timestamp: now() });
  }

  /**
   * @description This clears any oldExpiredEntry and returns the sum of the value for the entry with the given key
   * @param  {string} key
   */
  getSum(key) {
    // clear expired entries
    clearExpiredEntries(this.entries, expiryTimeInSeconds);

    let sum = 0;

    this.entries.forEach((entry) => {
      if (entry.key === key) {
        sum += entry.value;
      }
    });

    return sum;
  }
}

const instance = new DataStore();
Object.freeze(instance);

module.exports = instance;
