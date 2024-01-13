const express = require("express");
const router = express.Router();

const auth = require("../utils/auth");

const ticketService = require("../services/ticketService")

//POST: raise a new ticket by user..
router.post("/app/V1/raiseTicket",auth.validateAuthToken, ticketService.raiseTicket);

//GET: Get particular ticket by ticketID
router.get("/app/V1/getTicketById", auth.validateAuthToken, ticketService.getTicketById);

// GET: Get Active Tickets of User
router.get("/app/V1/getUserActiveTickets", auth.validateAuthToken, ticketService.getUserActiveTickets);

// GET: Get User ALL Ticket  
router.get("/app/V1/getUserAllTickets", auth.validateAuthToken, ticketService.getUserAllTickets);

//get all FAQ's
router.get("/app/V1/getAllFAQs", auth.validateAuthToken, ticketService.getAllFAQs);

//web app api's
//get all tickets in web app
router.get("/webapp/V1/getAllTickets", auth.validateAuthToken, ticketService.getAllTicketsInWebApp);

//update ticket by ticket id
router.put("/webapp/V1/updateTicket/:ticketId", auth.validateAuthToken, ticketService.updateTicketById);

module.exports = router;