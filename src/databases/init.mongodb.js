"use strict";
const {
  db: { host, port, name },
} = require("../configs/config.mongo");

const mongoose = require("mongoose");
const connectStr = `mongodb://${host}:${port}/${name}`;
console.log(connectStr);
const { countConnect, checkOverLoad } = require("../helpers/check.connect");
class Database {
  constructor() {
    this.connect();
  }
  //connect
  connect(type = "mongodb") {
    //dev
    if (1 === 1) {
      mongoose.set("debug", true);
      mongoose.set("debug", { color: true });
    }
    mongoose
      .connect(connectStr, {
        maxPoolSize: 50,
      })
      .then((_) => countConnect(), console.log("Connected"))
      .catch((err) => console.log("ERROR!", err));
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
  }
}

const instanceMongodb = Database.getInstance();
module.exports = instanceMongodb;
