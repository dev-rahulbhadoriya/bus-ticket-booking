const dbquery = require("../helpers/dbquery");
module.exports = {
    getadminsList: () => {
        const query = "SELECT * FROM partner_app.webapp_users";
        return dbquery.executeQuery(query);
    },
    getUsersList: () => {
        const query = `select id,users_name,employee_name,users_email,roleId,is_active,updated_by,last_logged_in,login_count from webapp_users`;
        return dbquery.executeQuery(query);
    },
    getadminDetails: (users_name) => {
        const query = "SELECT * FROM partner_app.webapp_users WHERE users_name = ?";
        return dbquery.executeQuery(query, [users_name]);
    },
    getadminDetailsId: (id) => {
        const query = "SELECT * FROM partner_app.webapp_users WHERE id = ?";
        return dbquery.executeQuery(query, [id]);
    },
    createadmin: (data) => {
        const query = "INSERT INTO partner_app.webapp_users SET ?";
        return dbquery.executeQuery(query, [data]);
    },
    getUserByUserName: (user_name) => {
        const selectQuery = "SELECT * FROM  partner_app.webapp_users WHERE users_name = ?";
        return dbquery.executeQuery(selectQuery, [user_name]);
    },
    updateAdminById: (data, id) => {
        const query = "UPDATE partner_app.webapp_users SET ? WHERE id = ?";
        return dbquery.executeQuery(query, [data, id]);
    },
    updateUserPasswordById: (data, id) => {
        const query = "UPDATE partner_app.webapp_users SET ? WHERE id = ?";
        return dbquery.executeQuery(query, [data, id]);
    },
    getBannerData: () => {
        const query = "SELECT id, url, Description, `App Version` as AppVersion, `Button Text` as ButtonText, `Show Button` as ShowButton, DisplayBannerOrNot, DescriptionIsEnglish, Gif_Url, Gif_Visibility, Gif_Url_to_be_opened, ButtonColor, TextColor, BackgroundColor, UrgentUpdate, header, created_by, created_at, updated_by, updated_at, DATE_FORMAT(date, '%Y-%m-%d') as date FROM partner_app.banner_data";
        return dbquery.executeQuery(query);
    },

};