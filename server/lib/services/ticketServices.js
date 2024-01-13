const axios = require('axios').default;

const ticketModel = require('../models/ticketModel');
const tikcetModel = require("../models/ticketModel")

// POST: to raise tickt by User...
const raiseTicket = async(req,res) => {
    try {
          const user = req.user;
          const body = req.body;

          console.log("user", user.name);
          console.log("body", body.ticketMessage);
          
       const raisedDate = new Date(new Date().getTime() + 19800000);
       console.log("raised Date", raisedDate);
          const response = await tikcetModel.raiseTicket(user.name,user.phone_number,user.email,body.ticketSubject,body.formId,body.ticketMessage,raisedDate);
          if(response){
                const notification = {
                    title: "New Ticket Raised",
                    body: "New Ticket Raised by "+user.name + " related "+body.ticketSubject+" issue!",
                };
                // console.log("notification", notification);
                const getAllNotificationsTokens = await tikcetModel.getAllNotificationsTokens();
                // console.log("getAllNotificationsTokens", getAllNotificationsTokens);
                if(getAllNotificationsTokens){
                    getAllNotificationsTokens.forEach(async (tokens) => {
                        // console.log("token###########", JSON.parse(tokens.token));
                        const send = await sendNotification(JSON.parse(tokens.token), notification);
                    });
                }
                return res.status(200).send({message:"Ticket raised successfully"});
            }
    } catch (error) {
        console.error("Ticket::error: ", error);
        return res.status(500).send(error);
    }
}


// GET: get Ticket Details by ID
const getTicketById = async (req,res) => {
    try {
        const user = req.user;
        const ticketId = req.query.ticketId;
        console.log("ticketId", ticketId);
        
        if(!ticketId || ticketId == null || ticketId == "" || ticketId == " " || ticketId== "null"){
            return res.status(400).send({message: "ticket is required"});
        }

        const ticketDetails = await ticketModel.getTicketById(ticketId,user.phone_number);
        // console.log("respnse", response);
        if(ticketDetails){
            return res.status(200).send(ticketDetails[0]);
        }
        else{
             return res.status(404).send({message: "Details not found"});
        }    
    } catch (error) {
        console.error("Ticket::error: ", error);
        return res.status(500).send(error);
    }
}

// GET: Get Active Tickets Of User...
const getUserActiveTickets = async (req,res) => {
    try {
        const user =req.user;
        
        const allActiveTickets = await ticketModel.getUserActiveTickets(user.phone_number);
        
        if(allActiveTickets){
            return res.status(200).send(allActiveTickets);
        }
        else{
             return res.status(404).send({message: "Details not found"});
        } 
    } catch (error) {
        console.error("Ticket::error: ", error);
        return res.status(500).send(error);
    }
}

// GET: Get All Tickets Of User...
const getUserAllTickets = async (req,res) => {
    try {
        const user =req.user;
        
        const allActiveTickets = await ticketModel.getUserAllTickets(user.phone_number);
        
        if(allActiveTickets){
            return res.status(200).send(allActiveTickets);
        }
        else{
             return res.status(404).send({message: "Details not found"});
        }
    } catch (error) {
        console.error("Ticket::error: ", error);
        return res.status(500).send(error);
    }
};

//get all FAQ's
const getAllFAQs = async (req,res) => {
    try {
        const allFAQs = await ticketModel.getAllFAQs();
        // console.log("allFAQs", allFAQs)
        if(allFAQs.length > 0){
            return res.status(200).send(allFAQs);
        }
        else{
                return res.status(404).send({message: "No FAQ's found"});
        }
    } catch (error) {
        console.error("Ticket::error: ", error);
        return res.status(500).send(error);
    }
};

//get all tickets in web app
const getAllTicketsInWebApp = async (req,res) => {
    try {
        const allTickets = await ticketModel.getAllTicketsInWebApp();
        if(allTickets){
            return res.status(200).send(allTickets);
        }
        else{
                return res.status(404).send({message: "No tickets found"});
        }
    } catch (error) {
        console.error("Ticket::error: ", error);
        return res.status(500).send(error);
    }
};

//update ticket by ticket id
const updateTicketById = async (req,res) => {
    try {
        const ticketId = req.params.ticketId;
        console.log("ticketId", ticketId)
        if(ticketId === undefined || ticketId === null || ticketId === ""){
            return res.status(400).send({message: "Ticket Id is required!"})
        }
        const body = req.body;
        const user = req.user;
        if(body.ticketStatus === undefined || body.ticketStatus === null || body.ticketStatus === "" || body.ticketStatus === "null"){
            return res.status(400).send({message: "Ticket Status is required!"})
        }
        // console.log("ticketId", ticketId);
        // console.log("body", body);
        // console.log("user", user);
        const getTicketById = await ticketModel.getTicketByIdInWeb(ticketId);
        if(getTicketById.length === 0){
            return res.status(404).send({message: "Ticket not found!"})
        }
        if(getTicketById[0].ticketStatus === "In Process" && body.ticketStatus === "Open"){
            return res.status(403).send({message: "Ticket Already In Process!"})
        }
        if(getTicketById[0].ticketStatus === "Closed"){
            return res.status(403).send({message: "Ticket Already Closed!"})
        }
        if(getTicketById[0].ticketStatus === "Open" && body.ticketStatus === "Closed"){
            return res.status(403).send({message: "Ticket can't be closed without processing!"})
        }
        body.updated_at = new Date(new Date().getTime() + 19800000);
        const updateTicket = await ticketModel.updateTicket(ticketId,body,user.users_name);
        if(updateTicket){
            if(body.ticketStatus === "Closed"){
                const getUser = await ticketModel.getUserByNumber(getTicketById[0].phone_number);
                const sendNotification = await sendNotificationForTicket(getUser[0].device_id);
            }
            return res.status(200).send({message: "Ticket updated successfully"});
        }
        else{
            return res.status(500).send({message: "Something went wrong!"});
        }
    } catch (error) {
        console.error("Ticket::error: ", error);
        return res.status(500).send(error);
    }
};

module.exports = {
    raiseTicket,
    getTicketById,
    getUserActiveTickets,
    getUserAllTickets,
    getAllTicketsInWebApp,
    updateTicketById,
    getAllFAQs
}