const mongoose = require("mongoose");
const { stateList } = require("../utils");

exports.imageSchema = new mongoose.Schema({
  source: {
    type: String,
    required: true
  },
  caption: String
});

exports.locationSchema = new mongoose.Schema({
  city: String,
  state: {
    type: String,
    required: true,
    enum: stateList
  }
});
