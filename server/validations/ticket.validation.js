const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createTicket = {
  body: Joi.object().keys({
    busName: Joi.string().required(),
    busNumber: Joi.string().required(),
    berthDetails: Joi.string().required(),
    pickupPoint: Joi.string().required(),
    dropPoint: Joi.string().required(),
    passengerDetails: Joi.string().required(),
    status: Joi.number().integer().required(),
  }),
};

const getTickets = {
  query: Joi.object().keys({
    // Add any filtering parameters you might need
  }),
};

const getTicket = {
  params: Joi.object().keys({
    id: Joi.number().integer().required().custom(objectId),
  }),
};

const updateTicket = {
  params: Joi.object().keys({
    id: Joi.number().integer().required().custom(objectId),
  }),
  body: Joi.object().keys({
    busName: Joi.string(),
    busNumber: Joi.string(),
    berthDetails: Joi.string(),
    pickupPoint: Joi.string(),
    dropPoint: Joi.string(),
    passengerDetails: Joi.string(),
    status: Joi.number().integer(),
  }).min(1),
};

const deleteTicket = {
  params: Joi.object().keys({
    id: Joi.number().integer().required().custom(objectId),
  }),
};

module.exports = {
  createTicket,
  getTickets,
  getTicket,
  updateTicket,
  deleteTicket,
};
