const dataStore = require("../pkg/data/datastore");
const logger = require("../pkg/logger");
const { notFound, successResponse, serverError } = require("./http");

/**
 * @description This trys the handler and send an internal server error if anything goes wrong in the handler
 * @param  {Handler} handler
 */
const tryHandler = (handler) => {
  return (req, res) => {
    try {
      handler(req, res);
    } catch (error) {
      logger.log("error", `internal server error occurred ${error.stack}`);
      return serverError(res);
    }
  };
};

/**
 * @description This handles the post metric route. It adds entry for key
 * @param  {Request} req
 * @param  {Response} res
 */
module.exports.postMetric = tryHandler((req, res) => {
  const {
    params: { key },
    body: { value },
  } = req;

  logger.log("info", `Adding entry ${key} for ${value} ...`);
  dataStore.addEntry({ key, value });

  return successResponse(res);
});
/**
 * @description This handles get metric request. It returns not found error if there is no entry for the key
 * and returns sum if entry can be retrieved for the key
 * @param  {Request} req
 * @param  {Response} res
 */
module.exports.getMetricSum = tryHandler((req, res) => {
  const { key } = req.params;

  logger.log("info", `searching datastore for key ${key} ...`);
  const sum = dataStore.getSum(key);
  if (!sum) {
    logger.log("warn", `cannot find entry for key ${key}`);
    return notFound(res, `Metrics cannot be found for ${key}`);
  }

  logger.log("info", `entry for ${key} found ... returning with sum ${sum}`);
  return successResponse(res, { value: sum });
});
