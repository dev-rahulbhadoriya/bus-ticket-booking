const express = require('express');
const router = express.Router();
const auth = require("../../middleware/auth");
const validate = require('../../middleware/validate');
const ticketController = require("../../controller/ticket.controller")
const ticketValidation = require("../../validations/")

router
    .route('/')
    .post(auth(''),validate(ticketValidation.createTicket) ,ticketController.createTicket)


module.exports = router;
