'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Buses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      busNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      upperSectionSeats: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 20,
      },
      lowerSectionSeats: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 20,
      },
      busDetails: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Buses');
  },
};
