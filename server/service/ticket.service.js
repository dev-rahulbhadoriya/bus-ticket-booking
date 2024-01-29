const db = require("../models");
const Bus = db.bus
const Ticket = db.ticket
const User = db.user
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
        busId: bus.busUniqueId,
        busNumber: bus.busNumber,
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
const getAllTickets = async () => {
    try {
      const tickets = await Ticket.findAll();
      return tickets;
    } catch (error) {
      console.error('Error getting all tickets:', error);
      throw new Error('Error getting all tickets');
    }
  };

  const getTicketOwnerDetails = async (ticketId) => {
    try {
      const ticket = await Ticket.findByPk(ticketId, {
        include: User, 
      });
  
      if (!ticket) {
        throw new Error('Ticket not found');
      }
  
      const user = ticket.User; 
  
      return {
        ticket,
        user,
      };
    } catch (error) {
      console.error(`Error getting details for ticket with ID ${ticketId}:`, error);
      throw new Error(`Error getting details for ticket with ID ${ticketId}`);
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

const getTicketStatus = async (ticketId) => {
  try {
    const status = await Ticket.findOne({
      attributes: ['status'],
      where: { ticketNumber: ticketId },
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

const updateTicketStatus = async (ticketId,data) => {
  try {
    const ticket = await Ticket.findByPk(ticketId);

    if (!ticket) {
      throw new Error('Ticket not found');
    }

    await ticket.update(data);

    return ticket;
  } catch (error) {
    console.error('Error updating ticket status:', error);
    throw new Error('Error updating ticket status');
  }
};

const resetAllBookedTickets = async () => {
    try {
      const bookedTickets = await Ticket.findAll({
        where: { status: 'closed' }, 
      });
      for (const ticket of bookedTickets) {
        await ticket.update({ status: 'open' });
  
        const bus = await Bus.findOne({ where: { busUniqueId: ticket.busId } });
  
        if (bus) {
          if (ticket.section === 'U') {
            await bus.update({ upperSectionBookedSeats: bus.upperSectionBookedSeats - 1 });
          } else {
            await bus.update({ lowerSectionBookedSeats: bus.lowerSectionBookedSeats - 1 });
          }
        }
      }
      return true; 
    } catch (error) {
      console.error('Error resetting booked tickets:', error);
      throw new Error('Error resetting booked tickets');
    }
  };
  
module.exports = {
  bookTickets,
  getAllTickets,
  getTicketOwnerDetails,
  getAllCloseTicket,
  getAllOpenTicket,
  getTicketStatus,
  updateTicketById,
  deleteTicketById,
  updateTicketStatus,
  resetAllBookedTickets
};
