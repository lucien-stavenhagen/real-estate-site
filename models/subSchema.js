const mongoose = require("mongoose");
exports.imageSchema = new mongoose.Schema({
  source: String,
  caption: String
});

exports.locationSchema = new mongoose.Schema({
  city: String,
  state: String
});
