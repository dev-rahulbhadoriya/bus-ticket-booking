'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tickets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      ticketNumber: {
        type: Sequelize.UUID, // Change the data type to UUID
        allowNull: false,
        unique: true,
      },
      busNumber: {
        type: Sequelize.STRING,
      },
      berthDetails: {
        type: Sequelize.ARRAY(Sequelize.STRING), // Use ARRAY for storing arrays of strings
      },
      pickupPoint: {
        type: Sequelize.STRING,
      },
      dropPoint: {
        type: Sequelize.STRING,
      },
      passengerDetails: {
        type: Sequelize.ARRAY(Sequelize.STRING), // Use ARRAY for storing arrays of strings
      },
      status: {
        type: Sequelize.ENUM('open', 'closed'), // Use individual values for ENUM
        defaultValue: 'open',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
        onUpdate: Sequelize.fn('NOW'),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('tickets');
  },
};
