const db = require("../models");
const bcrypt = require("bcrypt");
const ticket = db.ticket;

const createTicket = async (params) => {
    try {
        const newTicket = await ticket.create(params);
        return newTicket;
    } catch (error) {
        throw new Error("Error creating ticket");
    }
};

const getAllCloseTicket = async (filter, options) => {
    try {
        const closeTickets = await ticket.findAll({
            where: { status: 'closed' }, 
            ...options,
        });
        return closeTickets;
    } catch (error) {
        throw new Error("Error getting close tickets");
    }
};

const getAllOpenTicket = async () => {
    try {
        const openTickets = await ticket.findAll({
            where: { status: 'open' }, 
        });
        return openTickets;
    } catch (error) {
        throw new Error("Error getting open tickets");
    }
};

const getTicketDetailsByUserId = async (id) => {
    try {
        const userTickets = await ticket.findAll({
            where: { userId: id }, 
        });
        return userTickets;
    } catch (error) {
        throw new Error("Error getting user tickets");
    }
};

const getTicketStatus = async (ticketId) => {
    try {
        const status = await ticket.findOne({
            attributes: ['status'], 
            where: { id: ticketId },
        });
        return status;
    } catch (error) {
        throw new Error("Error getting ticket status");
    }
};

const updateTicketById = async (ticketId, updateParams) => {
    try {
        const updatedTicket = await ticket.update(updateParams, {
            where: { id: ticketId },
        });
        return updatedTicket;
    } catch (error) {
        throw new Error("Error updating ticket");
    }
};

const deleteTicketById = async (ticketId) => {
    try {
        const deletedTicket = await ticket.destroy({
            where: { id: ticketId },
        });
        return deletedTicket;
    } catch (error) {
        throw new Error("Error deleting ticket");
    }
};

module.exports = {
    createTicket,
    getAllCloseTicket,
    getAllOpenTicket,
    getTicketDetailsByUserId,
    getTicketStatus,
    updateTicketById,
    deleteTicketById,
};

