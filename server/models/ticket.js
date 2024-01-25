'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ticket extends Model {
    static associate(models) {
    }
  }

  ticket.init({
    busName: DataTypes.STRING,
    busNumber: DataTypes.STRING,
    bearthDetails: DataTypes.STRING,
    pickupPoint: DataTypes.STRING,
    dropPoint: DataTypes.STRING,
    passagerDetails: DataTypes.STRING,
    status: DataTypes.INTEGER,
    createdAt: DataTypes.INTEGER,
    updateAt: DataTypes.STRING,
    }, {
    sequelize,
    modelName: 'ticket',
  });


  return ticket;
};
