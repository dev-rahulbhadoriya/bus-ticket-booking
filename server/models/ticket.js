'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ticket.init({
    ticketDate: DataTypes.STRING,
    ticketDetails: DataTypes.STRING,
 // TODO: add more
  }, {
    sequelize,
    modelName: 'ticket',
  });

 // TODO: ADD more methods to handle the
  return ticket;
};