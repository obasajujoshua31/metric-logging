const { expect } = require("chai");
const { now } = require("../../../pkg/data/time.js");
const clearExpiredEntries = require("../../../pkg/data/util.js");
const after = require("../../util");

describe("Test clear expired entries", () => {
  it("should return without error when the entry list passed is empty", () => {
    const testEntries = [];

    clearExpiredEntries(testEntries, 2);
    expect(testEntries.length).to.equal(0);
  });

  it("should clear entries after the expiry time", () => {
    const expiryTime = 1;

    const entries = [{ key: "test", value: 30, timestamp: now() }];

    after(() => {
      clearExpiredEntries(entries, expiryTime);
      expect(entries.length).to.equal(0);
    }, expiryTime);
  });

  it("should not clear entries if the expiry time has not elapsed", () => {
    const expiryTime = 6;

    const entries = [{ key: "test", value: 30, timestamp: now() }];

    after(() => {
      clearExpiredEntries(entries, expiryTime);
      expect(entries.length).to.equal(1);
    }, expiryTime - 5);
  });
});
