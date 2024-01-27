'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Tickets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      ticketNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      busNumber: {
        type: Sequelize.STRING,
      },
      bearthDetails: {
        type: Sequelize.JSON, 
      },
      pickupPoint: {
        type: Sequelize.STRING,
      },
      dropPoint: {
        type: Sequelize.STRING,
      },
      passagerDetails: {
        type: Sequelize.JSON, 
      },
      status: {
        type: Sequelize.ENUM('open', 'closed'),
        defaultValue: 'open',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Tickets');
  },
};