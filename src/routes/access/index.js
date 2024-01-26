"use strict";

const express = require("express");
const accessController = require("../../controllers/access.controller");
const router = express.Router();

//singup
router.post("/shop/singUp", accessController.singUp);

module.exports = router;
