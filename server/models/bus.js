const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class bus extends Model {
    static associate(models) {
      bus.hasMany(models.ticket, { foreignKey: 'busId', as: 'tickets' });
    }
  }

  bus.init({
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
    modelName: 'bus',
  });

  return bus;
};
