const { expect } = require("chai");
const LinkedList = require("../../../pkg/data/linkedList");
const { now } = require("../../../pkg/data/time");
const afterDelay = require("../../util");

describe("Test Linkedlist data structure", () => {
  it("should create new linkedlist", () => {
    const list = new LinkedList();

    expect(list.head).to.be.null;
  });

  it("should add new entries and get sum correctly", () => {
    const list = new LinkedList();

    list.addElement({ key: "test", value: 23, timestamp: now() });

    list.addElement({ key: "test", value: 25, timestamp: now() });

    const sum = list.getSumOfElement("test");
    expect(sum).to.equal(48);
  });

  it("should not clear when data has not expired", () => {
    const list = new LinkedList();

    list.addElement({ key: "test", value: 23, timestamp: now() });

    list.addElement({ key: "test", value: 25, timestamp: now() });

    list.clearExpiredNodes();

    const sum = list.getSumOfElement("test");
    expect(sum).to.equal(48);
  });

  it("should clear when data has expired", async () => {
    const list = new LinkedList();

    const expiryTime = 1;
    list.addElement({ key: "test", value: 23, timestamp: now() });

    list.addElement({ key: "test", value: 25, timestamp: now() });

    await afterDelay(() => {}, expiryTime);

    list.addElement({ key: "test", value: 20, timestamp: now() });

    list.clearExpiredNodes(expiryTime);
    const sum = list.getSumOfElement("test");
    expect(sum).to.equal(20);
  });
});
