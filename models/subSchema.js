const mongoose = require("mongoose");
const { stateList } = require("../utils");

exports.imageSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  source: {
    type: String,
    required: true
  },
  caption: String
});

exports.locationSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  city: String,
  state: {
    type: String,
    required: true,
    enum: stateList
  }
});
