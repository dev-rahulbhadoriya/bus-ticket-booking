const db = require("../models");
const catchAsync = require("../utils/catchAsync");
const busServices = require("../service/bus.service");
const httpStatus = require("http-status");

const createBus = catchAsync(async (req, res) => {
    const bus = await busServices.createBus(req.body);

    if (bus) {
        res.json({ bus });
    } else {
        res.status(httpStatus.CONFLICT).json({
            message: "Bus already exists",
        });
    }
});

const getBusById = catchAsync(async (req, res) => {
    const { busId } = req.params;

    const bus = await busServices.getBusById(busId);

    if (!bus) {
        return res.status(404).json({ error: 'Bus not found' });
    }

    res.json(bus);
});

const getAllBuses = catchAsync(async (req, res) => {
    const buses = await busServices.getAllBuses();
    res.json(buses);
});

const updateBus = catchAsync(async (req, res) => {
    const { busId } = req.params;
    const updateParams = req.body;

    const updatedBus = await busServices.updateBus(busId, updateParams);

    if (!updatedBus) {
        return res.status(404).json({ error: 'Bus not found' });
    }

    res.json(updatedBus);
});

const deleteBus = catchAsync(async (req, res) => {
    const { busId } = req.params;

    const deletedBus = await busServices.deleteBus(busId);

    if (!deletedBus) {
        return res.status(404).json({ error: 'Bus not found' });
    }

    res.json({ message: 'Bus deleted successfully' });
});

module.exports = {
    createBus,
    getBusById,
    getAllBuses,
    updateBus,
    deleteBus,
};
