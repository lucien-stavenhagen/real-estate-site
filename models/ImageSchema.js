const mongoose = require("mongoose");
exports.imageSchema = new mongoose.Schema({
  source: String,
  caption: String
});
