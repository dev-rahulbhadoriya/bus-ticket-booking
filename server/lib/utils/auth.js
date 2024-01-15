const jwt = require("jsonwebtoken");
const { successResponse, errorResponse } = require("../utils/responseUtil");
const axios = require('axios').default;

//change in auth
const validateAuthTokenApplication = (req, res, next) => {
  
    if(!req.headers.authorization?.split(" ")[1] || req.headers.authorization?.split(" ")[1] == undefined || req.headers.authorization?.split(" ")[1] == null){
     // console.log("token@@@",req.headers.authorization?.split(" ")[1].toString());
      res.status(403).send(errorResponse("A token is required for authentication"));
      return;
    }
  const token = req.headers.authorization?.split(" ")[1].toString();
  // if (!token || token === undefined) {
  //   res
  //     .status(403)
  //     .send(errorResponse("A token is required for authentication"));
  //   return;
  // }
  try {
      axios.post(`https://oauth2.googleapis.com/tokeninfo?id_token=${token}`).then((rsss)=>{
            console.log("RESPONSE FROM GOOGLE API", rsss);
            next()
      }).catch((err)=>{
        console.log("err from oauth api", err);
        res.status(200).send("Invalid Token") 
      })
  } catch (err) {
    console.log(err);
    if (err.message === "invalid algorithm") {
      next();
      return;
    } else {
      console.log("err:: ", err.message);
      res.status(200).send("Token is expire!");
      return;
    }
  }
};


const validateAuthToken = (req, res, next) => {
    if(!req.headers.authorization?.split(" ")[1] || req.headers.authorization?.split(" ")[1] == undefined || req.headers.authorization?.split(" ")[1] == null){
    // console.log("token@@@",req.headers.authorization?.split(" ")[1].toString());
    res.status(403).send(errorResponse("A token is required for authentication"));
    return;
  }
  const token = req.headers.authorization?.split(" ")[1];
  // if (!token) {
  //   res
  //     .status(403)
  //     .send(errorResponse("A token is required for authentication"));
  //   return;
  // }
  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    console.log(err.message);
    if (err.message === "invalid algorithm") {
      next();
      return;
    } else {
      console.log("err:: ", err.message);
      res.status(401).send(errorResponse("Token is expire!"));
      return;
    }
  }
  next();
};



//validation
const validateUserDataWhilePasswordReset = async (req, res, next) => {
  try {
    const { id, password } = req.body;
    if (!id) {
      res.status(500).send(errorResponse("Invalid user id!"));
      return;
    }
    const users = await adminModel.getadminDetailsId(id);
    if (users.length === 0) {
      res.status(500).send(errorResponse("Invalid user id!"));
      return;
    }

    if (!password) {
      res.status(500).send(errorResponse("Invalid password!"));
      return;
    }

    next();
  } catch (error) {
    console.error("validateUserData::error: ", error.message);
    res.sendStatus(500);
  }
};
module.exports = {
  validateAuthToken,
  validateUserDataWhilePasswordReset,
  validateAuthTokenApplication
};
