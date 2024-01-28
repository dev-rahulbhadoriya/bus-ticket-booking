const express = require('express');
const router = express.Router();
const auth = require("../../middleware/auth");
const validate = require('../../middleware/validate');
const ticketController = require("../../controller/ticket.controller")
const busValidation = require("../../validations")

router
    .route('/')
    .post(auth(''),validate(busValidation.createBus) ,ticketController.createTicket)


module.exports = router;
