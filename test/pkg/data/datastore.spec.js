const { expect } = require("chai");
const datastore = require("../../../pkg/data/datastore");

describe("Test Datastore", () => {
  it("initial datastore should return getsum of 0", () => {
    const sum = datastore.getSum("any-key");

    expect(sum).to.equal(0);
  });

  it("add entry should should succeed when get sum is called", () => {
    datastore.addEntry({ key: "test", value: 34 });
    datastore.addEntry({ key: "test", value: 34 });
    datastore.addEntry({ key: "test-2", value: 23 });

    const sumForTest = datastore.getSum("test");
    expect(sumForTest).to.equal(68);

    const sumForTest2 = datastore.getSum("test-2");
    expect(sumForTest2).to.equal(23);
  });
});
