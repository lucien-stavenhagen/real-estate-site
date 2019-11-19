const {
  Commercial,
  Residential,
  Rental,
  Land
} = require("../models/RealEstateModels");
const mongoose = require("mongoose");
const { HOST_URI } = require("../utils");
//
// commercial
//
exports.add_images_commercial_byid = (request, response, next) => {
  Commercial.updateOne(
    { _id: request.params.id },
    {
      $push: {
        images: {
          source: request.file
            ? `${HOST_URI}/${request.file.path}`
            : "no file passed!",
          caption: request.body.caption
        }
      }
    }
  )
    .exec()
    .then(doc => response.json({ msg: "successful update", doc }))
    .catch(err =>
      response.status(400).json({
        msg: `error updating commercial entry by id ${request.params.id}`,
        err
      })
    );
};

exports.update_price_commercial_byid = (request, response, next) => {
  Commercial.updateOne(
    { _id: request.params.id },
    {
      price: request.params.price
    }
  )
    .exec()
    .then(doc => response.json({ msg: "successful update", doc }))
    .catch(err => {
      response.status(400).json({
        msg: `error updating price of commercial entry by id ${request.params.id}`,
        err
      });
    });
};
//
// residential
//
exports.add_images_residential_byid = (request, response, next) => {
  Residential.updateOne(
    { _id: request.params.id },
    {
      $push: {
        images: {
          source: request.file
            ? `${HOST_URI}/${request.file.path}`
            : "no file passed!",
          caption: request.body.caption
        }
      }
    }
  )
    .exec()
    .then(doc => response.json({ msg: "successful update", doc }))
    .catch(err =>
      response.status(400).json({
        msg: `error updating residential entry by id ${request.params.id}`,
        err
      })
    );
};

exports.update_price_residential_byid = (request, response, next) => {
  Residential.updateOne(
    { _id: request.params.id },
    {
      price: request.params.price
    }
  )
    .exec()
    .then(doc => response.json({ msg: "successful update", doc }))
    .catch(err => {
      response.status(400).json({
        msg: `error updating price of residential entry by id ${request.params.id}`,
        err
      });
    });
};

//
// rental
//
exports.add_images_rental_byid = (request, response, next) => {
  Rental.updateOne(
    { _id: request.params.id },
    {
      $push: {
        images: {
          source: request.file
            ? `${HOST_URI}/${request.file.path}`
            : "no file passed!",
          caption: request.body.caption
        }
      }
    }
  )
    .exec()
    .then(doc => response.json({ msg: "successful update", doc }))
    .catch(err =>
      response.status(400).json({
        msg: `error updating rental entry by id ${request.params.id}`,
        err
      })
    );
};

exports.update_price_rental_byid = (request, response, next) => {
  Rental.updateOne(
    { _id: request.params.id },
    {
      price: request.params.price
    }
  )
    .exec()
    .then(doc => response.json({ msg: "successful update", doc }))
    .catch(err => {
      response.status(400).json({
        msg: `error updating price of rental entry by id ${request.params.id}`,
        err
      });
    });
};

//
// land
//
exports.add_images_land_byid = (request, response, next) => {
  Land.updateOne(
    { _id: request.params.id },
    {
      $push: {
        images: {
          source: request.file
            ? `${HOST_URI}/${request.file.path}`
            : "no file passed!",
          caption: request.body.caption
        }
      }
    }
  )
    .exec()
    .then(doc => response.json({ msg: "successful update", doc }))
    .catch(err =>
      response.status(400).json({
        msg: `error updating land entry by id ${request.params.id}`,
        err
      })
    );
};
exports.update_price_land_byid = (request, response, next) => {
  Land.updateOne(
    { _id: request.params.id },
    {
      price: request.params.price
    }
  )
    .exec()
    .then(doc => response.json({ msg: "successful update", doc }))
    .catch(err => {
      response.status(400).json({
        msg: `error updating price of land entry by id ${request.params.id}`,
        err
      });
    });
};
