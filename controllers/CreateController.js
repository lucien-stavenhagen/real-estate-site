const {
  Commercial,
  Residential,
  Rental,
  Land
} = require("../models/RealEstateModels");
const mongoose = require("mongoose");

exports.create_commercial_entry = (request, response, next) => {
  const entry = {
    _id: mongoose.Types.ObjectId(),
    addedon: new Date().toLocaleString(),
    location: request.body.location,
    beds: request.body.beds,
    baths: request.body.baths,
    price: request.body.price,
    images: [
      {
        _id: mongoose.Types.ObjectId(),
        source: request.body.source,
        caption: request.body.caption
      }
    ]
  };
  const newentry = new Commercial(entry)
    .save()
    .then(doc => {
      response.json({
        msg: `successfully added commercial property. filename: ${request.file}`,
        doc
      });
    })
    .catch(err => {
      response.status(403).json({ msg: "commercial addition failed", err });
    });
};

exports.create_residential_entry = (request, response, next) => {
  const entry = {
    _id: mongoose.Types.ObjectId(),
    addedon: new Date().toLocaleString(),
    location: request.body.location,
    beds: request.body.beds,
    baths: request.body.baths,
    price: request.body.price,
    images: [
      {
        _id: mongoose.Types.ObjectId(),
        source: request.file.path,
        caption: request.body.caption
      }
    ]
  };
  const newentry = new Residential(entry)
    .save()
    .then(doc => {
      response.json({ msg: "sucessfully added residential property", doc });
    })
    .catch(err => {
      response.status(403).json({ msg: "residential addition failed", err });
    });
};

exports.create_rental_entry = (request, response, next) => {
  const entry = {
    _id: mongoose.Types.ObjectId(),
    addedon: new Date().toLocaleString(),
    location: request.body.location,
    beds: request.body.beds,
    baths: request.body.baths,
    rent: request.body.rent,
    basis: request.body.basis,
    images: [
      {
        _id: mongoose.Types.ObjectId(),
        source: request.body.source,
        caption: request.body.caption
      }
    ]
  };
  const newentry = new Rental(entry)
    .save()
    .then(doc => {
      response.json({ msg: "sucessfully added rental property", doc });
    })
    .catch(err => {
      response.status(403).json({ msg: "rental addition failed", err });
    });
};

exports.create_land_entry = (request, response, next) => {
  const entry = {
    _id: mongoose.Types.ObjectId(),
    addedon: new Date().toLocaleString(),
    location: request.body.location,
    acreage: request.body.acreage,
    price: request.body.price,
    images: [
      {
        _id: mongoose.Types.ObjectId(),
        source: request.body.source,
        caption: request.body.caption
      }
    ]
  };
  const newentry = new Land(entry)
    .save()
    .then(doc => {
      response.json({ msg: "sucessfully added land property", doc });
    })
    .catch(err => {
      response.status(403).json({ msg: "land addition failed", err });
    });
};
