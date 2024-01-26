"use strict";

const _ = require("lodash");

const getInfoData = ({ fields = [], obj = {} }) => {
  try {
    return _.pick(obj, fields);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getInfoData };
