const mongoose = require("mongoose");
const imageSchema = require("./ImageSchema").imageSchema;

const commercialSchema = new mongoose.Schema({
  addedon: Date,
  location: String,
  beds: String,
  baths: String,
  price: String,
  images: [imageSchema]
});

exports.Commercial = mongoose.model("Commercial", commercialSchema);

const residentialSchema = new mongoose.Schema({
  addedon: Date,
  location: String,
  beds: String,
  baths: String,
  price: String,
  images: [imageSchema]
});

exports.Residential = mongoose.model("Residential", residentialSchema);

const rentalSchema = new mongoose.Schema({
  addedon: Date,
  location: String,
  beds: String,
  baths: String,
  rent: String,
  basis: String,
  images: [imageSchema]
});

exports.Rental = mongoose.model("Rental", rentalSchema);

const landSchema = new mongoose.Schema({
  addedon: Date,
  location: String,
  acreage: String,
  price: String,
  images: [imageSchema]
});

exports.Land = mongoose.model("Land", landSchema);
