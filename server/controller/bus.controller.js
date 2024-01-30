const db = require("../models");
const catchAsync = require("../utils/catchAsync");
const busServices = require("../service/bus.service")
const httpStatus = require("http-status");

const createBus = catchAsync(async (req, res) => {
    const ticket = await busServices.createBus(req.body);
    if (ticket) {
        res.send({ticket});
        return;
    }
    res.status(httpStatus.CONFLICT).send({
        "message": "ticket already exists",
    })
});
// const getTicketById = catchAsync(async (req, res) => {
//     const { ticketId } = req.params;

//     const ticket = await Ticket.findByPk(ticketId);

//     if (!ticket) {
//         return res.status(404).json({ error: 'Ticket not found' });
//     }

//     res.json(ticket);
// });

// const getAllTickets = catchAsync(async (req, res) => {
//     const tickets = await Ticket.findAll();
//     res.json(tickets);
// });

// const updateTicket = catchAsync(async (req, res) => {
//     const { ticketId } = req.params;
//     const { title, description, status } = req.body;

//     const ticket = await Ticket.findByPk(ticketId);

//     if (!ticket) {
//         return res.status(404).json({ error: 'Ticket not found' });
//     }

//     await ticket.update({
//         title,
//         description,
//         status,
//     });

//     res.json(ticket);
// });

// const deleteTicket = catchAsync(async (req, res) => {
//     const { ticketId } = req.params;

//     const ticket = await Ticket.findByPk(ticketId);

//     if (!ticket) {
//         return res.status(404).json({ error: 'Ticket not found' });
//     }

//     await ticket.destroy();

//     res.json({ message: 'Ticket deleted successfully' });
// });

module.exports = {
    createBus,
//   getTicketById,
//   getAllTickets,
//   updateTicket,
//   deleteTicket,
};