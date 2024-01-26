const express = require('express');
const router = express.Router();
const auth = require("../../middleware/auth");
const validate = require('../../middleware/validate');



router.post('/tickets', validate(authValidation.login), authController.login);



module.exports = router;


//TODO: swagger 