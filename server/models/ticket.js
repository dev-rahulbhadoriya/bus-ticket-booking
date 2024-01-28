'use strict';
const { Model, DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize) => {
    class Ticket extends Model {
        static associate(models) {
            // Add any associations if needed
        }
    }

    Ticket.init({
        ticketNumber: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        busNumber: DataTypes.STRING,
        berthDetails: {
            type: DataTypes.STRING,
            get() {
                // Parse the stringified array when fetching from the database
                const value = this.getDataValue('berthDetails');
                return value ? JSON.parse(value) : [];
            },
            set(value) {
                // Stringify the array when saving to the database
                this.setDataValue('berthDetails', JSON.stringify(value));
            },
        },
        pickupPoint: DataTypes.STRING,
        dropPoint: DataTypes.STRING,
        passengerDetails: {
            type: DataTypes.STRING,
            get() {
                // Parse the stringified array when fetching from the database
                const value = this.getDataValue('passengerDetails');
                return value ? JSON.parse(value) : [];
            },
            set(value) {
                // Stringify the array when saving to the database
                this.setDataValue('passengerDetails', JSON.stringify(value));
            },
        },
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

    return Ticket;
};
