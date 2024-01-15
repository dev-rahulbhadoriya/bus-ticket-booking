require("dotenv").config();

console.log("In development");
module.exports = {
  MYSQL_HOST: process.env.MYSQL_HOST,
  MYSQL_PORT: process.env.MYSQL_PORT,
  MYSQL_USER: process.env.MYSQL_USER,
  MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
  MYSQL_DATABASE: process.env.MYSQL_DATABASE,
  JWT_TOKEN_KEY: process.env.JWT_TOKEN_KEY,
  NODE_ENV: process.env.NODE_ENV,
}
