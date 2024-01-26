const compression = require("compression");
const express = require("express");
const { default: helmet } = require("helmet");
const morgan = require("morgan");
const app = express();
//use .env file
require("dotenv").config();

//init middleware
app.use(morgan("dev"));
app.use(helmet());
//nen hoac giam bot du lieu gui di
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//init database
require("./databases/init.mongodb");

//init routers
app.use("", require("./routes"));
//handle error

module.exports = app;
