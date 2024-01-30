'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('buses', {
      busUniqueId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      busNumber: {
        type: Sequelize.STRING,
        allowNull: false,
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
      upperSectionBookedSeats: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      lowerSectionBookedSeats: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
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

    await queryInterface.addConstraint('buses', {
      fields: ['busUniqueId'],
      type: 'unique',
      name: 'unique_busUniqueId_constraint',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('buses');
  },
};
