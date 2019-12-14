const mongoose = require("mongoose");
const { stateList } = require("../utils");

exports.imageSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  filename: {
    type: String,
    required: true
  },
  source: {
    type: String,
    required: true
  }
});

const locationSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  address: String,
  city: String,
  state: {
    type: String,
    required: true,
    enum: stateList
  }
});
locationSchema.index({ city: 1, state: 1 });

exports.locationSchema = locationSchema;
