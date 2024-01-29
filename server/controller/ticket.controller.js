const db = require("../models");
const Ticket = db.ticket;
const catchAsync = require("../utils/catchAsync");
const ticketServices = require("../service/ticket.service");
const httpStatus = require("http-status");

const createTicket = catchAsync(async (req, res) => {
    const ticket = await ticketServices.bookTickets(req.user.id, req.body);
    if (ticket) {
        res.status(httpStatus.CREATED).json({ ticket });
    } else {
        res.status(httpStatus.CONFLICT).json({
            message: "Ticket already exists",
        });
    }
});

const getAllTicketsByUserId = catchAsync(async (req, res) => {
    const userId = req.user.id;

    try {
        const tickets = await ticketServices.getAllTicketsByUserId(userId);

        if (!tickets || tickets.length === 0) {
            return res.status(httpStatus.NOT_FOUND).json({ error: 'Tickets not found for the user' });
        }

        res.json(tickets);
    } catch (error) {
        console.error('Error getting tickets:', error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Error getting tickets' });
    }
});

const getAllTickets = catchAsync(async (req, res) => {
    const tickets = await ticketServices.getAllTickets();
    res.json(tickets);
});


const updateTicket = catchAsync(async (req, res) => {
    const { ticketId } = req.params;
    const { title, description, status } = req.body;

    const ticket = await Ticket.findByPk(ticketId);

    if (!ticket) {
        return res.status(httpStatus.NOT_FOUND).json({ error: 'Ticket not found' });
    }

    if (!req.user || !req.user.role || req.user.role !== 'admin') {
        return res.status(httpStatus.FORBIDDEN).json({ error: 'Permission denied' });
    }

    await ticket.update({
        title,
        description,
        status,
    });

    res.json(ticket);
});

const deleteTicket = catchAsync(async (req, res) => {
    const { ticketId } = req.params;

    const ticket = await Ticket.findByPk(ticketId);

    if (!ticket) {
        return res.status(httpStatus.NOT_FOUND).json({ error: 'Ticket not found' });
    }

    if (!req.user || !req.user.role || req.user.role !== 'admin') {
        return res.status(httpStatus.FORBIDDEN).json({ error: 'Permission denied' });
    }

    await ticket.destroy();

    res.json({ message: 'Ticket deleted successfully' });
});
const updateTicketStatus = catchAsync(async (req, res) => {
    const { ticketId } = req.params;
    const data  = req.body;
    const updatedTicket = await ticketServices.updateTicketStatus(ticketId, data);

    if (!updatedTicket) {
        return res.status(httpStatus.NOT_FOUND).json({ error: 'Ticket not found' });
    }

    res.json(updatedTicket);
});

const getTicketStatus = catchAsync(async (req, res) => {
    const { ticketId } = req.params;

    const status = await ticketServices.getTicketStatus(ticketId);

    if (!status) {
        return res.status(httpStatus.NOT_FOUND).json({ error: 'Ticket not found' });
    }

    res.json({ status });
});

const getAllCloseTicket = catchAsync(async (req, res) => {
    const closeTickets = await ticketServices.getAllCloseTicket();
    res.json(closeTickets);
});

const getAllOpenTicket = catchAsync(async (req, res) => {
    const openTickets = await ticketServices.getAllOpenTicket();
    res.json(openTickets);
});

const getTicketOwnerDetails = catchAsync(async (req, res) => {
    const { ticketId } = req.params;

    const ticketOwnerDetails = await ticketServices.getTicketOwnerDetails(ticketId);

    if (!ticketOwnerDetails) {
        return res.status(httpStatus.NOT_FOUND).json({ error: 'Ticket not found' });
    }

    res.json(ticketOwnerDetails);
});

const resetAllBookedTickets = catchAsync(async (req, res) => {
    if (!req.user.role == "admin") {
      return res.status(httpStatus.FORBIDDEN).json({ error: 'Admin access only' });
    }
  
    const success = await ticketServices.resetAllBookedTickets();
  
    if (success) {
      res.json({ message: 'All booked tickets reset to open status' });
    } else {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Failed to reset booked tickets' });
    }
  });
module.exports = {
    createTicket,
    getAllTicketsByUserId,
    getAllTickets,
    updateTicket,
    deleteTicket,
    updateTicketStatus,
    getTicketStatus,
    getAllCloseTicket,
    getAllOpenTicket,
    getTicketOwnerDetails,
    resetAllBookedTickets
};
