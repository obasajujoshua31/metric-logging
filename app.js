const express = require("express");
const router = require("./api/routes");
const swaggerUi = require("swagger-ui-express");
const { initAppMiddlewares, handleNotFound } = require("./app.middleware");
require("dotenv").config();
const swaggerDoc = require("./swagger.json");
// Initialize application
const app = express();

const port = process.env.PORT || 4545;

// Initialize application middlewares
initAppMiddlewares(app);

app.use("/", router);

// set up swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

console.log("In branch kenneth ......")
console.log("This is Joshua branch .....");

// Application to handle other requests that handler cannot be found
app.all("*", handleNotFound);

app.listen(port, console.log(`<== Metric SERVER started at ${port} ==>`));

module.exports = app;
