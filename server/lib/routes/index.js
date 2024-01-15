const express = require("express");
const router = express.Router();
const usersRouter = require("../routes/usersRoutes");
const jwt = require("jsonwebtoken");


router.get("/", (req, res) => res.send("Service is running!"));


// users routers
router.use("/user", usersRouter)

//TODO Ticket routers
module.exports = router;
