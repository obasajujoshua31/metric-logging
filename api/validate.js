const { sendBadRequest } = require("./http");
const logger = require("../pkg/logger");

/**
 * @description This is responsible for validation the post metric request. 
 * It returns bad request if value is not provided or it is not a number
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 */
const validatePostMetric = (req, res, next) => {
  const { value } = req.body;

  if (typeof value === "undefined" || !value) {
    logger.log("warn", "value entered is not defined");
    return sendBadRequest(res, "value is not defined");
  }

  if (isNaN(value)) {
    logger.log("warn", `the value ${value} entered is not valid `);
    return sendBadRequest(res, "value is not valid");
  }

  req.body.value = Math.round(value);

  logger.log("info", "request passed validation moving to handler ...");
  return next();
};

module.exports = validatePostMetric;
