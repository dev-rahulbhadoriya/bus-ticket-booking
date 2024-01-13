const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');

router.put('/updateTicketStatus/:ticketId', ticketController.updateTicketStatus);
router.get('/viewTicketStatus/:ticketId', ticketController.viewTicketStatus);
router.get('/viewClosedTickets', ticketController.viewClosedTickets);
router.get('/viewOpenTickets', ticketController.viewOpenTickets);
router.get('/viewTicketOwnerDetails/:ticketId', ticketController.viewTicketOwnerDetails);
router.post('/resetServer', ticketController.resetServer);

module.exports = router;
