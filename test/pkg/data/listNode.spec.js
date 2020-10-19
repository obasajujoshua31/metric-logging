const { expect } = require("chai");
const Node = require("../../../pkg/data/listNode");

describe("List Node", () => {
  it("should create new node object", () => {
    const newNode = new Node("test");

    expect(newNode.value).to.equal("test");
    expect(newNode.next).to.be.null;
  });
});
