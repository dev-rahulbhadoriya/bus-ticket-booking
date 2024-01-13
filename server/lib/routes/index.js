const express = require("express");
const router = express.Router();
const adminRouter = require("../routes/adminRouter")
const usersRouter = require("../routes/usersRouter");
const resetRouter = require("../routes/resetRouter");

router.get("/", (req, res) => res.send("Service is running!"));

// admin routers 
router.use("/admin", adminRouter);

// users routers
router.use("/users", usersRouter)

//password reset routes for partner Web App
router.use("/auth", resetRouter)


module.exports = router;
