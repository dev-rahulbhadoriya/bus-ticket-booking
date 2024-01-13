require("dotenv").config();

console.log("welcome pod");
module.exports = {
    MYSQL_HOST: process.env.MYSQL_HOST,
    MYSQL_PORT: process.env.MYSQL_PORT,
    MYSQL_USER: process.env.MYSQL_USER,
    MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
    MYSQL_DATABASE: process.env.MYSQL_DATABASE,
    JWT_TOKEN_KEY: process.env.JWT_TOKEN_KEY,
    SOCKET_PATH: process.env.SOCKET_PATH,
    NODE_ENV: process.env.NODE_ENV,

    MYSQL_HOST_1: process.env.MYSQL_HOST_1,
    MYSQL_PORT_1: process.env.MYSQL_PORT_1,
    MYSQL_USER_1: process.env.MYSQL_USER_1,
    MYSQL_PASSWORD_1: process.env.MYSQL_PASSWORD_1,
    MYSQL_DATABASE_1: process.env.MYSQL_DATABASE_1,

    MYSQL_HOST_2: process.env.MYSQL_HOST_2,
    MYSQL_PORT_2: process.env.MYSQL_PORT_2,
    MYSQL_USER_2: process.env.MYSQL_USER_2,
    MYSQL_PASSWORD_2: process.env.MYSQL_PASSWORD_2,
    MYSQL_DATABASE_2: process.env.MYSQL_DATABASE_2,
    SSL: process.env.SSL,
};
