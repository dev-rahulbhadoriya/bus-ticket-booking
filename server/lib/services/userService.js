const jwt = require("jsonwebtoken");
const { successResponse, errorResponse } = require("../utils/responseUtil");
const userModel  = require('../models/userModel')
const getToken = async (req, res) => {
  try {
    console.log("req.body", req.body);
    const token = jwt.sign(req.body,
      process.env.JWT_TOKEN_KEY,
      {
        expiresIn: "30d",
      }
    );
    return res.send(successResponse(token, "Token generated successfully"));
  } catch (error) {
    console.error("User::error: ", error.message);
    return res.sendStatus(500);
  }
};

//Register user
const registerUser = async (req, res) => {

    try {
      const { email, password } = req.body;

      if (!email || !password) {
          return res.status(400).json({ error: 'Bad Request - Missing email or password' });
      }
      const token = jwt.sign({ email }, process.env.secretkey, { expiresIn: '30d' });
      res.status(200).json({ message: 'User registered successfully', token });
  } catch (error) {
      console.error('Error in user registration:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

//login user
const loginUser = async (req, res) => {

    try {
      const { email, password } = req.body;

      if (!email || !password) {
          return res.status(400).json({ error: 'Bad Request - Missing email or password' });
      }
      const token = jwt.sign({ email }, process.env.secretkey, { expiresIn: '30d' });
      let data = usersRouter.
      res.status(200).json({ message: 'User registered successfully', token });
  } catch (error) {
      console.error('Error in user registration:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};  


module.exports = {
    loginUser, 
    registerUser,
    getToken
  };
