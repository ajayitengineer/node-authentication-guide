const Router = require("express").Router();
const authRoute = require("./authRoute");

Router.use("/auth", authRoute);

module.exports = Router;
