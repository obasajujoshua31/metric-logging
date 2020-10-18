const { Router } = require("express");
const { postMetric, getMetricSum } = require("./controller");
const validatePostMetric = require("./validate");

// Initialize app router
const router = Router();
router.post("/:key", validatePostMetric, postMetric);
router.get("/:key/sum", getMetricSum);


// Use router for /metric routes
module.exports = Router().use("/metric", router);
