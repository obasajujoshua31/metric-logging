const after = (func, delayInSeconds) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(func());
      } catch (err) {
        reject(err);
      }
    }, delayInSeconds * 1000);
  });
};

module.exports = after;
