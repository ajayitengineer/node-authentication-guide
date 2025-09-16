const dotenv = require("dotenv");
const envFile = ".env";
dotenv.config({ path: envFile });

const config = {
  app: {
    port: process.env.PORT || 3500,
  },
  mysqldatabase: {
    host: process.env.MYSQL_DB_HOST,
    username: process.env.MYSQL_DB_USERNAME,
    password: process.env.MYSQL_DB_PASSWORD,
    database: process.env.MYSQL_DB_DATABASE,
    port: process.env.MYSQL_DB_PORT,
  },
  auth: {
    jwtkey: process.env.JWT_AUTH_KEY,
    expiry: process.env.JWT_EXPIRY,
    refreshExpiry: process.env.JWT_REFRESH_EXPIRY,
  },
};

module.exports = config;
