const mysql = require("mysql");
const config = require("../config");

const pool = mysql.createPool({
  host: "34.93.65.88",
  port: 3306,
  user: config.MYSQL_USER,
  charset: "utf8mb4_unicode_ci",
  password: config.MYSQL_PASSWORD,
  database: config.MYSQL_DATABASE,
  socketPath: config.SOCKET_PATH,
  debug: false,
  connectionLimit: 10,
  multipleStatements: true,
});


pool.on("acquire", (connection) => {
  console.debug("Connection %d acquired", connection.threadId);
});

pool.on("connection", (connection) => {
  console.debug("Connection %d acquired from pool", connection.threadId);
});

pool.on("enqueue", () => {
  console.debug("Waiting for available connection slot");
});

pool.on("release", (connection) => {
  console.debug("Connection %d released", connection.threadId);
});

module.exports = {
  pool,
};
