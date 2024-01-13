const dbconnection = require("./dbconnection");

exports.executeQuery = async (query, options) => {
    console.debug("Executing query..");
    return new Promise((resolve, reject) => {
        const actualQuery = dbconnection.pool.query(query, options, (error, response) => {
            console.debug(`ExecuteQuery:: ${actualQuery.sql}`);
            if (error) {
                reject(error);
            } else {
                resolve(response);
            }
        });
    });
};

exports.executeQueryWithConnection = async (connection, query, options) => {
    console.debug("Executing query with connection..");
    return new Promise((resolve, reject) => {
        const actualQuery = connection.query(query, options, (error, response) => {
            console.debug(`ExecuteQuery:: ${actualQuery.sql}`);
            if (error) {
                reject(error);
            } else {
                resolve(response);
            }
        });
    });
};

exports.executeQuery_1 = async (query, options) => {
    console.debug("Executing query..");
    return new Promise((resolve, reject) => {
        const actualQuery = dbconnection.pool_1.query(query, options, (error, response) => {
            console.debug(`ExecuteQuery:: ${actualQuery.sql}`);
            if (error) {
                reject(error);
            } else {
                resolve(response);
            }
        });
    });
};

exports.executeQuery_2 = async (query, options) => {
    console.debug("Executing query..");
    return new Promise((resolve, reject) => {
        const actualQuery = dbconnection.pool_2.query(query, options, (error, response) => {
            console.debug(`ExecuteQuery:: ${actualQuery.sql}`);
            if (error) {
                reject(error);
            } else {
                resolve(response);
            }
        });
    });
};

exports.executeQuery_crmSqlServer = async (query, options) => {
    console.debug("Executing query..");
    return new Promise((resolve, reject) => {
        const actualQuery = dbconnection.crmSqlServer.query(query, options, (error, response) => {
            console.debug(`ExecuteQuery:: ${actualQuery.sql}`);
            if (error) {
                reject(error);
            } else {
                resolve(response);
            }
        });
    });
};

exports.executeQuery_cloudsql = async (query, options) => {
    console.debug("Executing query..");
    return new Promise((resolve, reject) => {
        const actualQuery = dbconnection.cloudsql.query(query, options, (error, response) => {
            console.debug(`ExecuteQuery:: ${actualQuery.sql}`);
            if (error) {
                reject(error);
            } else {
                resolve(response);
            }
        });
    });
}