'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('buses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      busId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        unique: true,
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
      fields: ['busId'],
      type: 'unique',
      name: 'unique_busId_constraint',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('buses');
  },
};
