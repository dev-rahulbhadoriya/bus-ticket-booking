const db = require("../models");
const Bus = db.bus
const Ticket = db.ticket
const bookTickets = async (userId, { busUniqueId, pickupPoint, dropPoint, passengerDetails, status, berthDetails }) => {
  try {
    if (!userId || !busUniqueId || !pickupPoint || !dropPoint || !passengerDetails || !status || !berthDetails) {
      throw new Error('Invalid input parameters');
    }

    const bus = await Bus.findOne({ where: { busUniqueId } });
    if (!bus) {
      throw new Error('Bus not found');
    }

    const bookedTickets = [];

    for (let i = 0; i < berthDetails.length; i++) {
      const section = berthDetails[i][0].toUpperCase();
      const seatNumber = berthDetails[i].substr(1);

      const ticket = await Ticket.create({
        busId: bus.id,
        userId,
        section,
        seatNumber,
        pickupPoint,
        dropPoint,
        passengerDetails: passengerDetails[i],
        status,
        berthDetails: berthDetails[i],
      });

      bookedTickets.push(ticket);
    }

    // Update booked seats
    if (bookedTickets.length > 0) {
      if (bookedTickets[0].section === 'U') {
        await bus.update({ upperSectionBookedSeats: bus.upperSectionBookedSeats + bookedTickets.length });
      } else {
        await bus.update({ lowerSectionBookedSeats: bus.lowerSectionBookedSeats + bookedTickets.length });
      }
    }

    return bookedTickets;
  } catch (error) {
    console.error(`Error booking tickets: ${error.message}`);
    throw new Error('Error booking tickets');
  }
};


const getAllCloseTicket = async (filter, options) => {
  try {
    const closeTickets = await Ticket.findAll({
      where: { status: 'closed', ...filter },
      ...options,
    });
    return closeTickets;
  } catch (error) {
    console.error('Error getting close tickets:', error);
    throw new Error('Error getting close tickets');
  }
};

const getAllOpenTicket = async () => {
  try {
    const openTickets = await Ticket.findAll({
      where: { status: 'open' },
    });
    return openTickets;
  } catch (error) {
    console.error('Error getting open tickets:', error);
    throw new Error('Error getting open tickets');
  }
};

const getTicketDetailsByUserId = async (userId) => {
  try {
    const userTickets = await Ticket.findAll({
      where: { userId },
    });
    return userTickets;
  } catch (error) {
    console.error('Error getting user tickets:', error);
    throw new Error('Error getting user tickets');
  }
};

const getTicketStatus = async (ticketId) => {
  try {
    const status = await Ticket.findOne({
      attributes: ['status'],
      where: { id: ticketId },
    });
    return status;
  } catch (error) {
    console.error('Error getting ticket status:', error);
    throw new Error('Error getting ticket status');
  }
};

const updateTicketById = async (ticketId, updateParams) => {
  try {
    const [updatedRows] = await Ticket.update(updateParams, {
      where: { id: ticketId },
    });
    return updatedRows > 0;
  } catch (error) {
    console.error('Error updating ticket:', error);
    throw new Error('Error updating ticket');
  }
};

const deleteTicketById = async (ticketId) => {
  try {
    const deletedRows = await Ticket.destroy({
      where: { id: ticketId },
    });
    return deletedRows > 0;
  } catch (error) {
    console.error('Error deleting ticket:', error);
    throw new Error('Error deleting ticket');
  }
};

module.exports = {
  bookTickets,
  getAllCloseTicket,
  getAllOpenTicket,
  getTicketDetailsByUserId,
  getTicketStatus,
  updateTicketById,
  deleteTicketById,
};
