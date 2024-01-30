const db = require("../models");
const Bus = db.bus;

const createBus = async (params) => {
  const { busNumber, busDetails } = params;
try{
  const bus = {
    busNumber,
    upperSectionSeats: 20,
    lowerSectionSeats: 20,
    busDetails,
  };

  const [createdBus, created] = await Bus.findOrCreate({
    where: { busNumber },
    defaults: bus,
  });

  if (created) {
    return createdBus;
  }

  return null;
}catch (error){
  console.error('Error creating bus:', error);
  return null;
}
};

const updateBus = async (busId, updateParams) => {
  const bus = await Bus.findByPk(busId);

  if (!bus) {
    return null; 
  }

  const updatedBus = await bus.update(updateParams);
  return updatedBus;
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
  deleteBus,
};
