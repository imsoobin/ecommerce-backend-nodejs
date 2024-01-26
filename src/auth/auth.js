"use strict";
const jwt = require("jsonwebtoken");

const createTokenPair = async (payload, publicKey, privateKey) => {
  try {
    //accessToken
    const accessToken = await jwt.sign(payload, publicKey, {
      expiresIn: "1 days",
    });
    //refreshToken
    const refreshToken = await jwt.sign(payload, privateKey, {
      expiresIn: "2 days",
    });
    //verify
    jwt.verify(accessToken, publicKey, (err, decode) => {
      if (err) {
        console.error("auth err", err);
      } else {
        console.log("decode", decode);
      }
    });
    return { accessToken, refreshToken };
  } catch (error) {
    console.log(error);
    return;
  }
};

module.exports = {
  createTokenPair,
};
