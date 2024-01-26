"use strict";
const { model, Schema } = require("mongoose");

// Declare the Schema of the Mongo model
var tokenSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "Shop",
      required: true,
    },
    publicKey: {
      type: String,
      required: true,
    },
    privateKey: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
    collection: "token",
  }
);

//Export the model
module.exports = model("Token", tokenSchema);
