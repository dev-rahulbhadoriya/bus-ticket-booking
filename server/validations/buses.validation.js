const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createBus = {
  body: Joi.object().keys({
    busNumber: Joi.string(),
    busDetails: Joi.string()
  }),
};

const getBuses = {
  query: Joi.object().keys({
    // Add any filtering parameters you might need
  }),
};

const getBus = {
  params: Joi.object().keys({
    id: Joi.number().integer().required().custom(objectId),
  }),
};

const updateBus = {
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

const deleteBus = {
  params: Joi.object().keys({
    id: Joi.number().integer().required().custom(objectId),
  }),
};

module.exports = {
  createBus,
  getBuses,
  getBus,
  updateBus,
  deleteBus,
};