const express = require('express');
const router = express.Router();
const auth = require("../../middleware/auth");
const validate = require('../../middleware/validate');
const ticketController = require("../../controller/ticket.controller")
const ticketValidation = require("../../validations/ticket.validation")

// Admin Routes
router.post('/admin/create', auth('manageUsers'), validate(ticketValidation.createTicket), ticketController.createTicket);
router.put('/admin/:ticketId/updateStatus', auth('manageUsers'), ticketController.updateTicketStatus);
router.put('/admin/:ticketId/update', auth('manageUsers'), validate(ticketValidation.updateTicket), ticketController.updateTicket);
router.delete('/admin/:ticketId/delete', auth('manageUsers'), ticketController.deleteTicket);
router.get('/admin/getAllTickets', auth('getUsers'), ticketController.getAllOpenTicket);
router.get('/admin/:ticketId/ticketStatus', auth('getUsers'), ticketController.getTicketStatus);
router.get('/admin/:ticketId/userDetails', auth('getUsers'), ticketController.getTicketOwnerDetails);
router.put('/admin/resetServer', auth('manageUsers'), ticketController.resetAllBookedTickets);


// User Routes
router.post('/user/create', auth('user'), validate(ticketValidation.createTicket), ticketController.createTicket);
router.get('/user/tickets', auth('user'), ticketController.getAllTicketsByUserId);

// Additional routes for both user and admin
router.get('/status/:ticketId', auth('getUsers'), ticketController.getTicketStatus);
router.get('/closed', auth('getUsers'), ticketController.getAllCloseTicket);
router.get('/open', auth('getUsers'), ticketController.getAllOpenTicket);

module.exports = router;
