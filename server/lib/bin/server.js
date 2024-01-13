const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const indexRouter = require("../routes/index");

const app = express();

// file list
const allowlist = [
  // add multilist allow of you frontend
  "http://localhost:3000",
];
const corsOptionsDelegate = (req, callback) => {
  let corsOptions;
  if (allowlist.indexOf(req.header("Origin")) !== -1) {

    corsOptions = { origin: true };
  } else {
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
};

app.use(cors(corsOptionsDelegate));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(helmet.frameguard({ action: "DENY" }));


app.use("/", indexRouter);

console.log(`Service successfully started in ${process.env.NODE_ENV || "development"}`);

module.exports = app;