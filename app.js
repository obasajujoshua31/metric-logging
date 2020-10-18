const express = require("express");
const router = require("./api/routes");
const { initAppMiddlewares, handleNotFound } = require("./app.middleware");
require("dotenv").config();

// Initialize application
const app = express();

const port = process.env.PORT || 4545;

// Initialize application middlewares
initAppMiddlewares(app);

app.use("/", router);

// Application to handle other requests that handler cannot be found
app.all("*", handleNotFound);

app.listen(port, console.log(`<== Metric SERVER started at ${port} -- ==>`));

module.exports = app;
