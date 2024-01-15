const dbquery = require("../helpers/dbquery");

module.exports = {
  createUser: (data) => {
    const query = "INSERT INTO partner_app.users SET ?";
    return dbquery.executeQuery(query, [data]);
  },
  getUsersDetails: (id) => {
    const query = "SELECT * FROM partner_app.users WHERE id = ?";
    return dbquery.executeQuery(query, [id]);
  },
  updateUsers: (data, id) => {
    const query = "UPDATE partner_app.users SET ? WHERE id = ?";
    return dbquery.executeQuery(query, [data, id]);
  },


};