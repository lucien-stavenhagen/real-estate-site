const mongoose = require("mongoose");
const imageSchema = new mongoose.Schema({
  source: String,
  caption: String
});

const instanceSchema = new mongoose.Schema({
  addedon: Date,
  location: String,
  beds: String,
  baths: String,
  price: String,
  images: [imageSchema]
});
const typeDocument = new mongoose.Schema({
  type: String,
  body: [instanceSchema]
});
