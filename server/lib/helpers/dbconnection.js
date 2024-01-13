const mysql = require("mysql");
const config = require("../config");

const pool = mysql.createPool({
  // host: "34.93.65.88",
  // port: 3306,
  user: config.MYSQL_USER,
  charset: "utf8mb4_unicode_ci",
  password: config.MYSQL_PASSWORD,
  database: config.MYSQL_DATABASE,
  socketPath: config.SOCKET_PATH,
  debug: false,
  connectionLimit: 10,
  multipleStatements: true,
});

const pool_1 = mysql.createPool({
  // host: "34.93.65.88",
  // port: 3306,
  user: config.MYSQL_USER,
  charset: "utf8mb4_unicode_ci",
  password: config.MYSQL_PASSWORD,
  database: config.MYSQL_DATABASE_1,
  socketPath: config.SOCKET_PATH,
  debug: false,
  connectionLimit: 10,
  multipleStatements: true,
});

const pool_2 = mysql.createPool({
  host: "mysql-123456.mysql.database.azure.com",
  port: 3306,
  user: "demodb",
  password: "GUp8VXUBbzwTx9xQzNPG",
  database: "opprotunities",
  connectionLimit: 10,
  ssl: require,
});

const crmSqlServer = mysql.createPool({
  connectionLimit: 1,
  host: "20.219.35.161",
  user: "gcpfunction",
  password: "+root420%",
  database: "anaxeecr_crm"
})

const cloudsql = mysql.createPool({
  connectionLimit: 1,
  host: "mysql-123456.mysql.database.azure.com",
  user: "demodb",
  password: "GUp8VXUBbzwTx9xQzNPG",
  database: "spoors_data",
  port: 3306,
  ssl: require,
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

pool_1.on("acquire", (connection) => {
  console.debug("Connection %d acquired", connection.threadId);
});

pool_1.on("connection", (connection) => {
  console.debug("Connection %d acquired from pool", connection.threadId);
});

pool_1.on("enqueue", () => {
  console.debug("Waiting for available connection slot");
});

pool_1.on("release", (connection) => {
  console.debug("Connection %d released", connection.threadId);
});

pool_2.on("acquire", (connection) => {
  console.debug("Connection %d acquired", connection.threadId);
});

pool_2.on("connection", (connection) => {
  console.debug("Connection %d acquired from pool", connection.threadId);
});

pool_2.on("enqueue", () => {
  console.debug("Waiting for available connection slot");
});

pool_2.on("release", (connection) => {
  console.debug("Connection %d released", connection.threadId);
});

crmSqlServer.on("acquire", (connection) => {
  console.debug("Connection %d acquired", connection.threadId);
});

crmSqlServer.on("connection", (connection) => {
  console.debug("Connection %d acquired from pool", connection.threadId);
});

crmSqlServer.on("enqueue", () => {
  console.debug("Waiting for available connection slot");
});

crmSqlServer.on("release", (connection) => {
  console.debug("Connection %d released", connection.threadId);
});

cloudsql.on("acquire", (connection) => {
  console.debug("Connection %d acquired", connection.threadId);
});

cloudsql.on("connection", (connection) => {
  console.debug("Connection %d acquired from pool", connection.threadId);
});

cloudsql.on("enqueue", () => {
  console.debug("Waiting for available connection slot");
});

cloudsql.on("release", (connection) => {
  console.debug("Connection %d released", connection.threadId);
});

module.exports = {
  pool,
  pool_1,
  pool_2,
  crmSqlServer,
  cloudsql
};
