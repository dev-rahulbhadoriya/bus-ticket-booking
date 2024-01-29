const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createTicket = {
  body: Joi.object().keys({
    busUniqueId: Joi.string().required(),
    numberOfSeats: Joi.array().items(Joi.string()).required(),
    pickupPoint: Joi.string().required(),
    dropPoint: Joi.string().required(),
    passengerDetails: Joi.array().items(Joi.string()).required(),
    status: Joi.string().valid('open', 'closed').required(),
  }),
};

const getTickets = {
  query: Joi.object().keys({
    // Add any filtering parameters you might need
  }),
};

const getTicket = {
  params: Joi.object().keys({
    id: Joi.string().required().custom(objectId),
  }),
};

const updateTicket = {
  params: Joi.object().keys({
    id: Joi.string().required().custom(objectId),
  }),
  body: Joi.object().keys({
    busUniqueId: Joi.string(),
    berthDetails: Joi.array().items(Joi.string()),
    pickupPoint: Joi.string(),
    dropPoint: Joi.string(),
    passengerDetails: Joi.array().items(Joi.string()),
    status: Joi.string().valid('open', 'closed'),
  }).min(1),
};

const deleteTicket = {
  params: Joi.object().keys({
    id: Joi.string().required().custom(objectId),
  }),
};

module.exports = {
  createTicket,
  getTickets,
  getTicket,
  updateTicket,
  deleteTicket,
};
