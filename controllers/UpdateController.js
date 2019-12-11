const {
  Commercial,
  Residential,
  Rental,
  Land
} = require("../models/RealEstateModels");
const mongoose = require("mongoose");
const fs = require("fs");
const { HOST_URI } = require("../utils");
//
// commercial
//
exports.add_images_commercial_byid = (request, response, next) => {
  const imglist = request.files.map(item => {
    return {
      _id: mongoose.Types.ObjectId(),
      filename: item.path,
      source: `${HOST_URI}/${item.path}`
    };
  });
  Commercial.updateOne(
    { _id: request.params.id },
    {
      $push: {
        images: {
          $each: imglist
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

exports.delete_commercial_image_byid = (request, response, next) => {
  const imagepath = decodeURIComponent(request.params.imagepath);
  Commercial.updateOne(
    {
      _id: request.params.id
    },
    { $pull: { images: { _id: request.params.imageid } } }
  )
    .exec()
    .then(doc => {
      if (fs.existsSync(imagepath)) {
        fs.unlinkSync(imagepath);
      }
      response.json({ msg: "successfully removed image", doc });
    })
    .catch(err => {
      response.status(400).json({ msg: "error removing entry", err });
    });
};

exports.update_commercial_byid = (request, response, next) => {
  Commercial.updateOne({ _id: request.params.id }, request.body)
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
  const imglist = request.files.map(item => {
    return {
      _id: mongoose.Types.ObjectId(),
      filename: item.path,
      source: `${HOST_URI}/${item.path}`
    };
  });
  Residential.updateOne(
    { _id: request.params.id },
    {
      $push: {
        images: {
          $each: imglist
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

exports.delete_residential_image_byid = (request, response, next) => {
  const imagepath = decodeURIComponent(request.params.imagepath);
  Residential.updateOne(
    {
      _id: request.params.id
    },
    { $pull: { images: { _id: request.params.imageid } } }
  )
    .exec()
    .then(doc => {
      if (fs.existsSync(imagepath)) {
        fs.unlinkSync(imagepath);
      }
      response.json({ msg: "successfully removed image", doc });
    })
    .catch(err => {
      response.status(400).json({ msg: "error removing entry", err });
    });
};

exports.update_residential_byid = (request, response, next) => {
  Residential.updateOne({ _id: request.params.id }, request.body)
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
  const imglist = request.files.map(item => {
    return {
      _id: mongoose.Types.ObjectId(),
      filename: item.path,
      source: `${HOST_URI}/${item.path}`
    };
  });
  Rental.updateOne(
    { _id: request.params.id },
    {
      $push: {
        images: {
          $each: imglist
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

exports.delete_rental_image_byid = (request, response, next) => {
  const imagepath = decodeURIComponent(request.params.imagepath);
  Rental.updateOne(
    {
      _id: request.params.id
    },
    { $pull: { images: { _id: request.params.imageid } } }
  )
    .exec()
    .then(doc => {
      if (fs.existsSync(imagepath)) {
        fs.unlinkSync(imagepath);
      }
      response.json({ msg: "successfully removed image", doc });
    })
    .catch(err => {
      response.status(400).json({ msg: "error removing entry", err });
    });
};

exports.update_rental_byid = (request, response, next) => {
  Rental.updateOne({ _id: request.params.id }, request.body)
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
  const imglist = request.files.map(item => {
    return {
      _id: mongoose.Types.ObjectId(),
      filename: item.path,
      source: `${HOST_URI}/${item.path}`
    };
  });
  Land.updateOne(
    { _id: request.params.id },
    {
      $push: {
        images: {
          $each: imglist
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

exports.delete_land_image_byid = (request, response, next) => {
  const imagepath = decodeURIComponent(request.params.imagepath);
  Land.updateOne(
    {
      _id: request.params.id
    },
    { $pull: { images: { _id: request.params.imageid } } }
  )
    .exec()
    .then(doc => {
      if (fs.existsSync(imagepath)) {
        fs.unlinkSync(imagepath);
      }
      response.json({ msg: "successfully removed image", doc });
    })
    .catch(err => {
      response.status(400).json({ msg: "error removing entry", err });
    });
};

exports.update_land_byid = (request, response, next) => {
  Land.updateOne({ _id: request.params.id }, request.body)
    .exec()
    .then(doc => response.json({ msg: "successful update", doc }))
    .catch(err => {
      response.status(400).json({
        msg: `error updating price of land entry by id ${request.params.id}`,
        err
      });
    });
};
