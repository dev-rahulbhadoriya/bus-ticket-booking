const Ticket = require('../models/ticketModel');

const TicketService = {
  updateTicketStatus: (ticketId, status, userDetails) => {
    return Ticket.updateStatus(ticketId, status, userDetails);
  },

  viewTicketStatus: (ticketId) => {
    return Ticket.getTicketStatus(ticketId);
  },

  viewClosedTickets: () => {
    return Ticket.getClosedTickets();
  },

  viewOpenTickets: () => {
    return Ticket.getOpenTickets();
  },

  viewTicketOwnerDetails: (ticketId) => {
    return Ticket.getTicketOwnerDetails(ticketId);
  },

  resetServer: () => {
    return Ticket.resetServer();
  },
};

module.exports = TicketService;
