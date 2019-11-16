const {
  Commercial,
  Residential,
  Rental,
  Land
} = require("../models/RealEstateModels");
const mongoose = require("mongoose");

exports.add_images_commercial_byid = (request, response, next) => {
  Commercial.updateOne({
    _id: request.params.id,
    $push: {
      images: {
        source: request.params.source,
        caption: request.params.caption
      }
    }
  })
    .exec()
    .then(doc => response.json(doc))
    .catch(err =>
      response
        .status(403)
        .json({ msg: `error updating entry by id ${request.params.id}`, err })
    );
};
