const {
  Commercial,
  Residential,
  Rental,
  Land
} = require("../models/RealEstateModels");

//
// commercial
//
exports.get_all_commercial_entries = (request, response, next) => {
  Commercial.find()
    .exec()
    .then(doc => {
      response.json(doc);
    })
    .catch(err => {
      response.status(400).json({ msg: "error retrieving entries", err });
    });
};

exports.get_all_commercial_bylocation = (request, response, next) => {
  Commercial.find({
    "location.city": request.params.city,
    "location.state": request.params.state
  })
    .exec()
    .then(doc => {
      response.json(doc);
    })
    .catch(err => {
      response.status(400).json({ msg: "error retrieving entries", err });
    });
};

exports.get_all_commercial_bypricerange = (request, response, next) => {
  Commercial.find({
    price: { $gte: request.params.min, $lte: request.params.max }
  })
    .exec()
    .then(doc => {
      response.json(doc);
    })
    .catch(err => {
      response.status(400).json({ msg: "error retrieving entries", err });
    });
};

exports.get_all_commercial_bysquarefeet = (request, response, next) => {
  Commercial.find({
    squarefeet: { $gte: request.params.min, $lte: request.params.max }
  })
    .exec()
    .then(doc => {
      response.json(doc);
    })
    .catch(err => {
      response.status(400).json({ msg: "error retrieving entries", err });
    });
};

exports.get_commercial_byid = (request, response, next) => {
  Commercial.findById(request.params.id)
    .exec()
    .then(doc => response.json(doc))
    .catch(err =>
      response
        .status(400)
        .json({ msg: `error retrieving entry by id ${request.params.id}`, err })
    );
};
//
// residential
//
exports.get_all_residential_entries = (request, response, next) => {
  Residential.find()
    .exec()
    .then(doc => {
      response.json(doc);
    })
    .catch(err => {
      response.status(400).json({ msg: "error retrieving entries", err });
    });
};

exports.get_all_residential_bylocation = (request, response, next) => {
  Residential.find({
    "location.city": request.params.city,
    "location.state": request.params.state
  })
    .exec()
    .then(doc => {
      response.json(doc);
    })
    .catch(err => {
      response.status(400).json({ msg: "error retrieving entries", err });
    });
};

exports.get_all_residential_bypricerange = (request, response, next) => {
  Residential.find({
    price: { $gte: request.params.min, $lte: request.params.max }
  })
    .exec()
    .then(doc => {
      response.json(doc);
    })
    .catch(err => {
      response.status(400).json({ msg: "error retrieving entries", err });
    });
};

exports.get_all_residential_bybedsandbaths = (request, response, next) => {
  Residential.find({
    beds: request.params.beds,
    baths: request.params.baths
  })
    .exec()
    .then(doc => {
      response.json(doc);
    })
    .catch(err => {
      response.status(400).json({ msg: "error retrieving entries", err });
    });
};

exports.get_residential_byid = (request, response, next) => {
  Residential.findById(request.params.id)
    .exec()
    .then(doc => response.json(doc))
    .catch(err =>
      response
        .status(400)
        .json({ msg: `error retrieving entry by id ${request.params.id}`, err })
    );
};
//
// rental
//
exports.get_all_rental_entries = (request, response, next) => {
  Rental.find()
    .exec()
    .then(doc => {
      response.json(doc);
    })
    .catch(err => {
      response.status(400).json({ msg: "error retrieving entries", err });
    });
};

exports.get_all_rental_bylocation = (request, response, next) => {
  Rental.find({
    "location.city": request.params.city,
    "location.state": request.params.state
  })
    .exec()
    .then(doc => {
      response.json(doc);
    })
    .catch(err => {
      response.status(400).json({ msg: "error retrieving entries", err });
    });
};

exports.get_all_rental_bypricerange = (request, response, next) => {
  Rental.find({
    rent: { $gte: request.params.min, $lte: request.params.max },
    basis: request.params.basis
  })
    .exec()
    .then(doc => {
      response.json(doc);
    })
    .catch(err => {
      response.status(400).json({ msg: "error retrieving entries", err });
    });
};

exports.get_all_rental_bybedsandbaths = (request, response, next) => {
  Rental.find({
    beds: request.params.beds,
    baths: request.params.baths
  })
    .exec()
    .then(doc => {
      response.json(doc);
    })
    .catch(err => {
      response.status(400).json({ msg: "error retrieving entries", err });
    });
};

exports.get_rental_byid = (request, response, next) => {
  Rental.findById(request.params.id)
    .exec()
    .then(doc => response.json(doc))
    .catch(err =>
      response
        .status(400)
        .json({ msg: `error retrieving entry by id ${request.params.id}`, err })
    );
};

//
// land
//
exports.get_all_land_entries = (request, response, next) => {
  Land.find()
    .exec()
    .then(doc => {
      response.json(doc);
    })
    .catch(err => {
      response.status(400).json({ msg: "error retrieving entries", err });
    });
};

exports.get_all_land_bylocation = (request, response, next) => {
  Land.find({
    "location.city": request.params.city,
    "location.state": request.params.state
  })
    .exec()
    .then(doc => {
      response.json(doc);
    })
    .catch(err => {
      response.status(400).json({ msg: "error retrieving entries", err });
    });
};

exports.get_all_land_bypricerange = (request, response, next) => {
  Land.find({
    price: { $gte: request.params.min, $lte: request.params.max }
  })
    .exec()
    .then(doc => {
      response.json(doc);
    })
    .catch(err => {
      response.status(400).json({ msg: "error retrieving entries", err });
    });
};

exports.get_all_land_byacreage = (request, response, next) => {
  Land.find({
    acreage: { $gte: request.params.min, $lte: request.params.max }
  })
    .exec()
    .then(doc => {
      response.json(doc);
    })
    .catch(err => {
      response.status(400).json({ msg: "error retrieving entries", err });
    });
};

exports.get_land_byid = (request, response, next) => {
  Land.findById(request.params.id)
    .exec()
    .then(doc => response.json(doc))
    .catch(err =>
      response
        .status(400)
        .json({ msg: `error retrieving entry by id ${request.params.id}`, err })
    );
};
