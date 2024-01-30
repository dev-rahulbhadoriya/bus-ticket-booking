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
        type: Sequelize.UUID, 
        allowNull: false,
        unique: true,
      },
      busNumber: {
        type: Sequelize.STRING,
      },
      section: {
        type: Sequelize.STRING,
        allowNull: false,
    },
      berthDetails: {
        type: Sequelize.JSON, 
      },
      pickupPoint: {
        type: Sequelize.STRING,
      },
      dropPoint: {
        type: Sequelize.STRING,
      },
      passengerDetails: {
        type: Sequelize.JSON, 
      },
      status: {
        type: Sequelize.ENUM('open', 'closed'), 
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
