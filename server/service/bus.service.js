const db = require("../models");
const Bus = db.bus;

const createBus = async (params) => {
  const { busNumber, busDetails } = params;
  try {
    const bus = {
      busNumber,
      upperSectionSeats: 20,
      lowerSectionSeats: 20,
      busDetails,
      busUniqueId: 'generated_uuid',
    }

    const [createdBus, created] = await Bus.findOrCreate({
      where: { busNumber },
      defaults: bus,
    });

    if (created) {
      return createdBus;
    }

    return null;
  } catch (error) {
    console.error('Error creating bus:', error);
    return null;
  }
};

const updateBus = async (busUniqueId, updateParams) => {
  const bus = await Bus.findOne(busUniqueId);

  if (!bus) {
    return null;
  }

  const updatedBus = await bus.update(updateParams);
  return updatedBus;
};
const getBusById = async (busUniqueId) => {
  const bus = await Bus.findOne(busUniqueId);

  return bus;
};

const getAllBuses = async () => {
  const buses = await Bus.findAll();

  return buses;
};
const deleteBus = async (busId) => {
  const bus = await Bus.findByPk(busId);

  if (!bus) {
    return null;
  }

  await bus.destroy();
  return bus;
};

module.exports = {
  createBus,
  updateBus,
  getBusById,
  getAllBuses,
  deleteBus,
};
