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
    busUniqueId: Joi.string(),
    busNumber: Joi.string(),
    upperSectionSeats: Joi.number(),
    lowerSectionSeats: Joi.number(),
    busDetails: Joi.string(),
    upperSectionBookedSeats:  Joi.number(),
    lowerSectionBookedSeats: Joi.number(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};
const getBus = {
  params: Joi.object().keys({
    busUniqueId: Joi.string().required(),
  }),
};

const updateBus = {
  params: Joi.object().keys({
    busUniqueId: Joi.string().required(),
  }),
  body: Joi.object().keys({
    busNumber: Joi.string(),
    busDetails: Joi.string(),
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
