const db = require("../models");
const bcrypt = require("bcrypt");
const User = db.user;


const createticket = async (params) => {
    // TODO: create ticket
};


const getAllTicket = async (filter, options) => {
    // TODO: get all ticket
};

const getTicketById = async (id) => {
    // TODO: get ticket by id
};

const updateTicketById = async (ticketId) => {
    // TODO: update ticket
};


const deleteTicketById = async (ticketId) => {
  // TODO: deleteTicket By Id
};

module.exports = {
    createticket,
    getTicketById,
    getAllTicket,
    updateTicketById,
    deleteTicketById,
};
