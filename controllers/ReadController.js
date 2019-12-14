const {
  Commercial,
  Residential,
  Rental,
  Land
} = require("../models/RealEstateModels");
const mongoose = require("mongoose");

//
// all
//
exports.get_union_of_all_cities_indb = async (request, response, next) => {
  try {
    const commAll = await Commercial.find(
      {},
      { "location.city": 1, "location.state": 1 }
    );
    const resAll = await Residential.find(
      {},
      { "location.city": 1, "location.state": 1 }
    );
    const rentAll = await Rental.find(
      {},
      { "location.city": 1, "location.state": 1 }
    );
    const landAll = await Land.find(
      {},
      { "location.city": 1, "location.state": 1 }
    );
    //
    // accumulate the union all the cities/states
    // having at least one property in one
    // or more of the collections.
    // this is to make a listing
    // of cities/state only, available for autocomplete
    // in the search function.
    // A little
    // dirty because it's orthogonal to
    // the DB data organization
    // so we have to use the BFH to get this data.
    //
    //
    // do a "set" on an array of the
    // location.city and .state fields in each
    // collection, generated
    // with the map method.
    //
    // then use the spread operator
    // to combine them all into
    // another set, to remove any
    // dupes that may exist across each subset.
    //
    const unionOfAllCities = new Set([
      ...new Set(
        commAll.map(item => {
          return `${item.location.city},${item.location.state}`;
        })
      ),
      ...new Set(
        resAll.map(item => {
          return `${item.location.city},${item.location.state}`;
        })
      ),
      ...new Set(
        rentAll.map(item => {
          return `${item.location.city},${item.location.state}`;
        })
      ),
      ...new Set(
        landAll.map(item => {
          return `${item.location.city},${item.location.state}`;
        })
      )
    ]);
    return response.json({
      cities: [...unionOfAllCities]
    });
  } catch (error) {
    return response.status(400).json({ msg: "failed" });
  }
};

exports.get_all = async (request, response, next) => {
  try {
    const commAll = await Commercial.find();
    const resAll = await Residential.find();
    const rentAll = await Rental.find();
    const landAll = await Land.find();
    return response.json({
      commercial: [...commAll],
      residential: [...resAll],
      rental: [...rentAll],
      land: [...landAll]
    });
  } catch (error) {
    return response.status(400).json({ msg: "failed" });
  }
};

exports.get_all_bycity = async (request, response, next) => {
  try {
    const commByCity = await Commercial.find({
      "location.city": request.params.city,
      "location.state": request.params.state
    });
    const resByCity = await Residential.find({
      "location.city": request.params.city,
      "location.state": request.params.state
    });
    const rentByCity = await Rental.find({
      "location.city": request.params.city,
      "location.state": request.params.state
    });
    const landByCity = await Land.find({
      "location.city": request.params.city,
      "location.state": request.params.state
    });
    return response.json({
      commercial: [...commByCity],
      residential: [...resByCity],
      rental: [...rentByCity],
      land: [...landByCity]
    });
  } catch (error) {
    return response.status(400).json({ msg: "failed" });
  }
};

exports.get_all_bypricerange = async (request, response, next) => {
  try {
    let commByPR = await Commercial.find({
      price: { $gte: request.params.min, $lte: request.params.max }
    })
      .sort({ price: "desc" })
      .exec();
    const resByPR = await Residential.find({
      price: { $gte: request.params.min, $lte: request.params.max }
    })
      .sort({ price: "desc" })
      .exec();
    const landByPR = await Land.find({
      price: { $gte: request.params.min, $lte: request.params.max }
    })
      .sort({ price: "desc" })
      .exec();
    return response.json({
      msg: "succeded",
      commercial: [...commByPR],
      residential: [...resByPR],
      land: [...landByPR]
    });
  } catch (error) {
    return response.status(400).json({ msg: "failed", error });
  }
};

exports.get_all_byrentrange = async (request, response, next) => {
  try {
    const rentByPR = await Rental.find({
      rent: { $gte: request.params.min, $lte: request.params.max }
    });
    return response.json({
      msg: "succeded",
      rental: [...rentByPR]
    });
  } catch (error) {
    return response.status(400).json({ msg: "failed", error });
  }
};

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

//
// paginated version for
// reference. currently not used.
// we'll have to move to this
// eventually for large collections.
//
// https://docs.mongodb.com/manual/reference/method/cursor.skip/
// https://docs.mongodb.com/manual/reference/operator/query/in/index.html
//
//
exports.get_all_commercial_entries_paged = async (request, response, next) => {
  try {
    if (!request.query.page) {
      throw Error("page parameter is required!");
    }
    let pagesize = 4;
    if (request.query.pagesize && +request.query.pagesize) {
      pagesize = +request.query.pagesize;
    }
    const pagefactor =
      request.query.page > 0 ? (request.query.page - 1) * pagesize : 0;
    let ids = await Commercial.find({}, { _id: 1 })
      .hint("_id_")
      .sort({ _id: -1 });
    ids = ids.map(item => item._id);
    const docs = await Commercial.find({
      _id: { $in: ids.slice(pagefactor, pagefactor + pagesize) }
    }).sort({ _id: -1 });
    const retlist = {
      numdocs: ids.length,
      pages: Math.ceil(ids.length / pagesize),
      page: [...docs]
    };
    response.json(retlist);
  } catch (err) {
    response
      .status(400)
      .json({ msg: "error retrieving entries", error: err.message });
  }
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
