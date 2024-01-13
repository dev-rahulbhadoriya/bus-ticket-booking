const dbquery = require("../helpers/dbquery");

module.exports = {
    
    updateStatus: (ticketId, status, userDetails) => {
        const query = 'UPDATE tickets SET status = ?, user_details = ? WHERE id = ?';
        return dbquery.executeQuery(query, [status, userDetails, ticketId]);
      },
    
      getTicketStatus: (ticketId) => {
        const query = 'SELECT status FROM tickets WHERE id = ?';
        return dbquery.executeQuery(query, [ticketId]);
      },
    
      getClosedTickets: () => {
        const query = 'SELECT * FROM tickets WHERE status = "closed"';
        return dbquery.executeQuery(query);
      },
    
      getOpenTickets: () => {
        const query = 'SELECT * FROM tickets WHERE status = "open"';
        return dbquery.executeQuery(query);
      },
    
      getTicketOwnerDetails: (ticketId) => {
        const query = 'SELECT owner_details FROM tickets WHERE id = ?';
        return dbquery.executeQuery(query, [ticketId]);
      },
    
      resetServer: () => {
        const query = 'UPDATE tickets SET status = "open"';
        return dbquery.executeQuery(query);
      },
  
};
