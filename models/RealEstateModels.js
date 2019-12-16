const mongoose = require("mongoose");
const { imageSchema, locationSchema } = require("./subSchema");
const { basisList } = require("../utils");

const commercialSchema = new mongoose.Schema({
  addedon: Date,
  location: locationSchema,
  squarefeet: Number,
  electric: Boolean,
  plumbing: Boolean,
  price: { type: Number, index: true },
  images: [imageSchema],
  description: String
});

exports.Commercial = mongoose.model("Commercial", commercialSchema);

const residentialSchema = new mongoose.Schema({
  addedon: Date,
  location: locationSchema,
  beds: Number,
  baths: Number,
  price: { type: Number, index: true },
  images: [imageSchema],
  description: String
});

exports.Residential = mongoose.model("Residential", residentialSchema);

const rentalSchema = new mongoose.Schema({
  addedon: Date,
  location: locationSchema,
  beds: Number,
  baths: Number,
  rent: { type: Number, index: true },
  basis: { type: String, required: true, enum: basisList },
  allbillspaid: Boolean,
  images: [imageSchema],
  description: String
});

exports.Rental = mongoose.model("Rental", rentalSchema);

const landSchema = new mongoose.Schema({
  addedon: Date,
  location: locationSchema,
  acreage: Number,
  price: { type: Number, index: true },
  images: [imageSchema],
  description: String
});

exports.Land = mongoose.model("Land", landSchema);
