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
exports.add_images_commercial_byid = (request, response, next) => {
  Commercial.updateOne({
    _id: request.params.id,
    $push: {
      images: {
        source: request.file ? request.file.path : "no file passed!",
        caption: request.body.caption
      }
    }
  })
    .exec()
    .then(doc => response.json(doc))
    .catch(err =>
      response.status(400).json({
        msg: `error updating commercial entry by id ${request.params.id}`,
        err
      })
    );
};
//
// residential
//
exports.add_images_residential_byid = (request, response, next) => {
  Residential.updateOne({
    _id: request.params.id,
    $push: {
      images: {
        source: request.file ? request.file.path : "no file passed!",
        caption: request.body.caption
      }
    }
  })
    .exec()
    .then(doc => response.json(doc))
    .catch(err =>
      response.status(400).json({
        msg: `error updating residential entry by id ${request.params.id}`,
        err
      })
    );
};
//
// rental
//
exports.add_images_rental_byid = (request, response, next) => {
  Rental.updateOne({
    _id: request.params.id,
    $push: {
      images: {
        source: request.file ? request.file.path : "no file passed!",
        caption: request.body.caption
      }
    }
  })
    .exec()
    .then(doc => response.json(doc))
    .catch(err =>
      response.status(400).json({
        msg: `error updating rental entry by id ${request.params.id}`,
        err
      })
    );
};
//
// land
//
exports.add_images_land_byid = (request, response, next) => {
  Land.updateOne({
    _id: request.params.id,
    $push: {
      images: {
        source: request.file ? request.file.path : "no file passed!",
        caption: request.body.caption
      }
    }
  })
    .exec()
    .then(doc => response.json(doc))
    .catch(err =>
      response.status(400).json({
        msg: `error updating land entry by id ${request.params.id}`,
        err
      })
    );
};
