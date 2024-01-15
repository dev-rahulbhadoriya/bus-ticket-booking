const express = require("express");
const router = express.Router();
const auth = require("../utils/auth");
const userService = require("../services/userService");


router.get("/signin", userService.loginUser),
router.get("/signup", userService.registerUser);

module.exports = router;