const { Sequelize } = require("sequelize");
const config = require("./config");

const getDB = new Sequelize(
  config.mysqldatabase.database,
  config.mysqldatabase.username,
  config.mysqldatabase.password,
  {
    host: config.mysqldatabase.host,
    port: config.mysqldatabase.port,
    dialect: "mysql",
    logging: false,
  }
);

module.exports = { getDB };
