const db = require("../models");
const Ticket = db.ticket;
const catchAsync = require("../utils/catchAsync");
const ticketServices = require("../service/ticket.service")

const createTicket = catchAsync(async (req, res) => {
    const ticket = await ticketServices.createTicket(req.body);
    if (ticket) {
        res.send({ticket});
        return;
    }
    res.status(httpStatus.CONFLICT).send({
        "message": "ticket already exists",
    })
});
const getTicketById = catchAsync(async (req, res) => {
    const { ticketId } = req.params;

    const ticket = await Ticket.findByPk(ticketId);

    if (!ticket) {
        return res.status(404).json({ error: 'Ticket not found' });
    }

    res.json(ticket);
});

const getAllTickets = catchAsync(async (req, res) => {
    const tickets = await Ticket.findAll();
    res.json(tickets);
});

const updateTicket = catchAsync(async (req, res) => {
    const { ticketId } = req.params;
    const { title, description, status } = req.body;

    const ticket = await Ticket.findByPk(ticketId);

    if (!ticket) {
        return res.status(404).json({ error: 'Ticket not found' });
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
        return res.status(404).json({ error: 'Ticket not found' });
    }

    await ticket.destroy();

    res.json({ message: 'Ticket deleted successfully' });
});

module.exports = {
  createTicket,
  getTicketById,
  getAllTickets,
  updateTicket,
  deleteTicket,
};