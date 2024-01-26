"use strict";

const shopModel = require("../models/shop.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const TokenService = require("./token.service");
const { createTokenPair } = require("../auth/auth");
const { getInfoData } = require("../utils");
const RoleShop = { SHOP: "SHOP" };

class AccessService {
  static singUp = async ({ name, email, password }) => {
    try {
      //check exists email
      const holderShop = await shopModel.findOne({ email }).lean();
      if (holderShop) {
        return {
          code: "xx",
          message: "Shop already !",
        };
      }

      const hashPass = await bcrypt.hash(password, 10);
      const newShop = await shopModel.create({
        name,
        email,
        password: hashPass,
        roles: [RoleShop.SHOP],
      });
      if (newShop) {
        // const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
        //   modulusLength: 4096,
        //   publicKeyEncoding: { type: "pkcs1", format: "pem" },
        //   privateKeyEncoding: { type: "pkcs1", format: "pem" },
        // });

        const privateKey = crypto.randomBytes(64).toString("hex");
        const publicKey = crypto.randomBytes(64).toString("hex");

        const keyStore = await TokenService.createToken({
          userId: newShop._id,
          publicKey,
          privateKey,
        });
        if (!keyStore) {
          return {
            code: "xzx",
            message: "Error keyStore",
          };
        }
        // const publicKeyObj = crypto.createPublicKey(publicKeyString);
        //create token pair
        const tokens = await createTokenPair(
          { userId: newShop._id, email },
          publicKey,
          privateKey
        );
        return {
          code: 201,
          metadata: {
            shop: getInfoData({
              fields: ["_id", "name", "email"],
              obj: newShop,
            }),
            tokens,
          },
        };
      }

      return { code: 200, metadata: null };
    } catch (error) {
      return {
        code: "xxx",
        message: error.message,
        status: "error",
      };
    }
  };
}

module.exports = AccessService;
