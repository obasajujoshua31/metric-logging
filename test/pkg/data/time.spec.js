const { expect } = require("chai");
const { getTimeDifference, now } = require("../../../pkg/data/time");

describe("Test get time difference", () => {
  it("should return 0 second", () => {
    const diff = getTimeDifference(now(), now());
    expect(diff).to.equal(0);
  });

  it("should return the correct for each set of seconds", () => {
    const offSetSecs = [3, 4, 5, 6, 7, 8];

    offSetSecs.forEach((offSet) => {
      const offSetTime = new Date();
      offSetTime.setSeconds(offSetTime.getSeconds() + offSet);

      const diff = getTimeDifference(offSetTime, now());
      expect(diff).to.equal(offSet);
    });
  });
});
