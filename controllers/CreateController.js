const {
  Commercial,
  Residential,
  Rental,
  Land
} = require("../models/RealEstateModels");
const mongoose = require("mongoose");
const { HOST_URI, publicDir } = require("../utils");
//
// commercial
//
exports.create_commercial_entry = (request, response, next) => {
  const imglist = request.files.map(item => {
    return {
      _id: mongoose.Types.ObjectId(),
      filename: item.path,
      source: `${HOST_URI}/${item.path}`
    };
  });
  const entry = {
    _id: mongoose.Types.ObjectId(),
    addedon: new Date().toLocaleString(),
    location: {
      address: request.body.address,
      city: request.body.city,
      state: request.body.state
    },
    squarefeet: request.body.squarefeet,
    plumbing: request.body.plumbing,
    electric: request.body.electric,
    price: request.body.price,
    images: imglist,
    description: request.body.description
  };
  const newentry = new Commercial(entry)
    .save()
    .then(doc => {
      response.json({
        msg: "successfully added commercial property",
        doc
      });
    })
    .catch(err => {
      response.status(400).json({ msg: "commercial addition failed", err });
    });
};

//
// residential
//
exports.create_residential_entry = (request, response, next) => {
  const imglist = request.files.map(item => {
    return {
      _id: mongoose.Types.ObjectId(),
      filename: item.path,
      source: `${HOST_URI}/${item.path}`
    };
  });
  const entry = {
    _id: mongoose.Types.ObjectId(),
    addedon: new Date().toLocaleString(),
    location: {
      address: request.body.address,
      city: request.body.city,
      state: request.body.state
    },
    beds: request.body.beds,
    baths: request.body.baths,
    price: request.body.price,
    images: imglist,
    description: request.body.description
  };
  const newentry = new Residential(entry)
    .save()
    .then(doc => {
      response.json({ msg: "sucessfully added residential property", doc });
    })
    .catch(err => {
      response.status(400).json({ msg: "residential addition failed", err });
    });
};

//
// rental
//
exports.create_rental_entry = (request, response, next) => {
  const imglist = request.files.map(item => {
    return {
      _id: mongoose.Types.ObjectId(),
      filename: item.path,
      source: `${HOST_URI}/${item.path}`
    };
  });

  const entry = {
    _id: mongoose.Types.ObjectId(),
    addedon: new Date().toLocaleString(),
    location: {
      address: request.body.address,
      city: request.body.city,
      state: request.body.state
    },
    beds: request.body.beds,
    baths: request.body.baths,
    rent: request.body.rent,
    basis: request.body.basis,
    allbillspaid: request.body.allbillspaid,
    images: imglist,
    description: request.body.description
  };
  const newentry = new Rental(entry)
    .save()
    .then(doc => {
      response.json({ msg: "successfully added rental property", doc });
    })
    .catch(err => {
      response.status(400).json({ msg: "rental addition failed", err });
    });
};

//
// land
//
exports.create_land_entry = (request, response, next) => {
  const imglist = request.files.map(item => {
    return {
      _id: mongoose.Types.ObjectId(),
      filename: item.path,
      source: `${HOST_URI}/${item.path}`
    };
  });

  const entry = {
    _id: mongoose.Types.ObjectId(),
    addedon: new Date().toLocaleString(),
    location: {
      address: request.body.address,
      city: request.body.city,
      state: request.body.state
    },
    acreage: request.body.acreage,
    price: request.body.price,
    images: imglist,
    description: request.body.description
  };
  const newentry = new Land(entry)
    .save()
    .then(doc => {
      response.json({ msg: "sucessfully added land property", doc });
    })
    .catch(err => {
      response.status(400).json({ msg: "land addition failed", err });
    });
};
