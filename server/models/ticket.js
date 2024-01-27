'use strict';
const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
    class ticket extends Model {
        static associate(models) {
            // Add any associations if needed
        }
    }

    ticket.init({
        ticketNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        busNumber: DataTypes.STRING,
        bearthDetails: DataTypes.ARRAY(DataTypes.STRING),
        pickupPoint: DataTypes.STRING,
        dropPoint: DataTypes.STRING,
        passagerDetails: DataTypes.ARRAY(DataTypes.STRING),
        status: {
            type: DataTypes.ENUM('open', 'closed'),
            defaultValue: 'open',
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    }, {
        sequelize,
        modelName: 'ticket',
        hooks: {
            beforeCreate: (ticket) => {
                ticket.ticketNumber = uuidv4();
            },
        },
    });

    return ticket;
};
