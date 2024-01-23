'use strict';
const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
  static associate(models) {
    // Define associations here if needed
    }
  }

  Ticket.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('open', 'closed'),
      defaultValue: 'open',
    },
  }, {
    sequelize,
    modelName: 'Ticket',
  });

  return Ticket;
};
