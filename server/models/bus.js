const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Bus extends Model {
    static associate(models) {
      Bus.hasMany(models.Ticket, { foreignKey: 'busId', as: 'tickets' });
    }
  }

  Bus.init({
    busNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    upperSectionSeats: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 20,
    },
    lowerSectionSeats: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 20,
    },
    busDetaisl: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'Bus',
  });

  return Bus;
};
