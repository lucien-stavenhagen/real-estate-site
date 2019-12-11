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
  Commercial.updateOne({
    _id: request.params.id,
    $pull: { images: { _id: request.params.imageid } }
  })
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
  const newobj = {};
  if (
    !request.body.price ||
    !request.body.plumbing ||
    !request.body.electric ||
    !request.body.description
  ) {
    response.status(400).json({
      error: "price, plumbing, electric and description are all required"
    });
  } else {
    Commercial.updateOne(
      { _id: request.params.id },
      {
        price: request.body.price,
        plumbing: request.body.plumbing,
        electric: request.body.electric,
        description: request.body.description
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
  }
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
  Residential.updateOne({
    _id: request.params.id,
    $pull: { images: { _id: request.params.imageid } }
  })
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
  if (!request.body.price || !request.body.description) {
    response.status(400).json({ error: "price and description required" });
  } else {
    Residential.updateOne(
      { _id: request.params.id },
      {
        price: request.body.price,
        description: request.body.description
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
  }
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
  Rental.updateOne({
    _id: request.params.id,
    $pull: { images: { _id: request.params.imageid } }
  })
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
  if (
    !request.body.rent ||
    !request.body.basis ||
    !request.body.allbillspaid ||
    !request.body.description
  ) {
    response.status(400).json({
      error: "rent, basis, allbillspaid and description all required"
    });
  } else {
    Rental.updateOne(
      { _id: request.params.id },
      {
        rent: request.body.rent,
        basis: request.body.basis,
        allbillspaid: request.body.allbillspaid,
        description: request.body.description
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
  }
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
  Land.updateOne({
    _id: request.params.id,
    $pull: { images: { _id: request.params.imageid } }
  })
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
  if (!request.body.price || !request.body.description) {
    response.status(400).json({ error: "price and description required" });
  } else {
    Land.updateOne(
      { _id: request.params.id },
      {
        price: request.body.price,
        description: request.body.description
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
  }
};
