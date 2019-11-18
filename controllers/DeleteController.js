const {
  Commercial,
  Residential,
  Rental,
  Land
} = require("../models/RealEstateModels");
const mongoose = require("mongoose");

//
// commercial
//

exports.delete_commercial_byid = (request, response, next) => {
  Commercial.findByIdAndRemove(request.params.id, {
    useFindAndModify: false
  })
    .exec()
    .then(doc => {
      response.json({ msg: "successfully removed commercial entry", doc });
    })
    .catch(err => {
      response.status(400).json({ msg: "error removing entry", err });
    });
};
//
// residential
//

exports.delete_residential_byid = (request, response, next) => {
  Residential.findByIdAndRemove(request.params.id, {
    useFindAndModify: false
  })
    .exec()
    .then(doc => {
      response.json({ msg: "successfully removed residential entry", doc });
    })
    .catch(err => {
      response.status(400).json({ msg: "error removing entry", err });
    });
};

//
// rental
//

exports.delete_rental_byid = (request, response, next) => {
  Rental.findByIdAndRemove(request.params.id, {
    useFindAndModify: false
  })
    .exec()
    .then(doc => {
      response.json({ msg: "successfully removed rental entry", doc });
    })
    .catch(err => {
      response.status(400).json({ msg: "error removing entry", err });
    });
};

//
// land
//

exports.delete_land_byid = (request, response, next) => {
  Land.findByIdAndRemove(request.params.id, {
    useFindAndModify: false
  })
    .exec()
    .then(doc => {
      response.json({ msg: "successfully removed land entry", doc });
    })
    .catch(err => {
      response.status(400).json({ msg: "error removing entry", err });
    });
};
