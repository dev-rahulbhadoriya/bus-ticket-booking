const express = require('express');
const router = express.Router();
const auth = require("../../middleware/auth");
const validate = require('../../middleware/validate');
const busController = require("../../controller/bus.controller")
const busValidation = require("../../validations/buses.validation")

router.post('/addBus',auth('manageUsers'),validate(busValidation.createBus),busController.createBus)
router.get('/getAllBuses',auth('manageUsers'),validate(busValidation.getBuses),busController.getAllBuses)
router.get('/:busUniqueId',auth('manageUsers'),validate(busValidation.getBus),busController.getBusById)
router.put('/:busUniqueId',auth('manageUsers'),validate(busValidation.updateBus),busController.updateBus)

module.exports = router;
