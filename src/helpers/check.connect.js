"use strict";

const mongoose = require("mongoose");
const os = require("os");
const process = require("process");
const SECONDS = 5000;

const countConnect = () => {
  const numberConnection = mongoose.connections.length;
  console.log("Number connection: ", numberConnection);
};

const checkOverLoad = () => {
  setInterval(() => {
    const numberConnection = mongoose.connections.length;
    const numCores = os.cpus().length;
    const memoryUsage = process.memoryUsage().rss;
    //maximum number of connections based on number of cores
    const maxConnection = numCores * 5;
    console.log("Number connections: ", numberConnection);
    console.log("Memory Usage: ", memoryUsage / 1024 / 1024, "MB");
    if (numberConnection > maxConnection) {
      console.log("Overload connection");
    }
  }, SECONDS);
};

module.exports = { countConnect, checkOverLoad };
