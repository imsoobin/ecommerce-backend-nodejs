"use strict";

const AccessService = require("../services/access.service");

class AccessController {
  singUp = async (req, res, next) => {
    try {
      console.log(`[P]::singUp::`, req.body);
      return res.status(201).json(await AccessService.singUp(req.body));
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}

module.exports = new AccessController();
