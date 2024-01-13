const dbquery = require("../helpers/dbquery");
module.exports = {

    getAdminList: () => {
        const query = `select id,users_name,employee_name from admin`;
        return dbquery.executeQuery(query);
    },
   
};