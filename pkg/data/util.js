const { getTimeDifference, now } = require("./time");

/**
 * @description This takes the entries and clears every expired entry based on the expiry Time provided
 * @param  {[]} entries
 * @param  {Number} expiryTime
 */
const clearExpiredEntries = (entries, expiryTime) => {
  if (!entries.length) {
    return;
  }

  for (let entryIndex = 0; entryIndex < entries.length; entryIndex++) {
    if (getTimeDifference(now(), entries[entryIndex].timestamp) >= expiryTime) {
      entries.splice(entryIndex);
      return;
    }
  }
};

module.exports = clearExpiredEntries;
