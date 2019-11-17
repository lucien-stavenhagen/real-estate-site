const mongoose = require("mongoose");
const { imageSchema, locationSchema } = require("./subSchema");

const commercialSchema = new mongoose.Schema({
  addedon: Date,
  location: locationSchema,
  squarefeet: Number,
  electric: Boolean,
  plumbing: Boolean,
  price: Number,
  images: [imageSchema]
});

exports.Commercial = mongoose.model("Commercial", commercialSchema);

const residentialSchema = new mongoose.Schema({
  addedon: Date,
  location: locationSchema,
  beds: Number,
  baths: Number,
  price: Number,
  images: [imageSchema]
});

exports.Residential = mongoose.model("Residential", residentialSchema);

const rentalSchema = new mongoose.Schema({
  addedon: Date,
  location: locationSchema,
  beds: Number,
  baths: Number,
  rent: Number,
  basis: String,
  allbillspaid: Boolean,
  images: [imageSchema]
});

exports.Rental = mongoose.model("Rental", rentalSchema);

const landSchema = new mongoose.Schema({
  addedon: Date,
  location: locationSchema,
  acreage: Number,
  price: Number,
  images: [imageSchema]
});

exports.Land = mongoose.model("Land", landSchema);
