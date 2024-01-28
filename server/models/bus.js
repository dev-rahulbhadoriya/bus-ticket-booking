const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class bus extends Model {
    static associate(models) {
      bus.hasMany(models.ticket, { foreignKey: 'busId', as: 'tickets' });
    }
  }

  bus.init({
    busUniqueId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
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
    busDetails: {
      type: DataTypes.STRING,
    },
    upperSectionBookedSeats: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    lowerSectionBookedSeats: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  }, {
    sequelize,
    modelName: 'bus',
    hooks: {
      beforeCreate: (bus) => {
        bus.busUniqueId = uuidv4();
      },
    },
  });

  return bus;
};
