/**
 * @description This method returns the time difference in seconds between two times
 * @param  {Date} upperTime
 * @param  {Date} lowerTime
 * @returns returns the absolute difference between both times in seconds rounded to the nearest value
 */
module.exports.getTimeDifference = (upperTime, lowerTime) => {
  let diff =
    (new Date(upperTime).getTime() - new Date(lowerTime).getTime()) / 1000;

  return Math.abs(Math.round(diff));
};

// One hour in seconds
module.exports.oneHourInSeconds = 3600;

// now timestamp
module.exports.now = () => new Date();
