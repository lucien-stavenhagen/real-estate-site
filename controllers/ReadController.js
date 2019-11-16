const {
  Commercial,
  Residential,
  Rental,
  Land
} = require("../models/RealEstateModels");
const mongoose = require("mongoose");

exports.get_all_commercial_entries = (request, response, next) => {
  Commercial.find()
    .exec()
    .then(doc => {
      response.json(doc);
    })
    .catch(err => {
      response.status(403).json({ msg: "error retrieving entries", err });
    });
};
exports.get_all_commercial_bylocation = (request, response, next) => {
  Commercial.find({
    location: request.params.location
  })
    .exec()
    .then(doc => {
      response.json(doc);
    })
    .catch(err => {
      response.status(403).json({ msg: "error retrieving entries", err });
    });
};
exports.get_commercial_byid = (request, response, next) => {
  Commercial.findById(request.params.id)
    .exec()
    .then(doc => response.json(doc))
    .catch(err =>
      response
        .status(403)
        .json({ msg: `error retrieving entry by id ${request.params.id}`, err })
    );
};
