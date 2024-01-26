"use strict";

const tokenModel = require("../models/token.model");

class TokenService {
  static createToken = async ({ userId, publicKey, privateKey }) => {
    try {
      const tokens = await tokenModel.create({
        user: userId,
        publicKey,
        privateKey,
      });
      return tokens ? tokens.publicKey : null;
    } catch (error) {
      return error;
    }
  };
}

module.exports = TokenService;
