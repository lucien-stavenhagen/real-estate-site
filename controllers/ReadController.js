const { typeHelper } = require("../utils");

//
// commercial
//

//
// paginated versions
//
// https://docs.mongodb.com/manual/reference/method/cursor.skip/
// https://docs.mongodb.com/manual/reference/operator/query/in/index.html
//
// counting the docs then using skip().limit() is the cleanest way
// to do this for probably any collection less than 50,000 or so
// the relative performance is going to be ok, even though
// this is probably the slowest way to do it.
//
exports.get_all_cities = async (request, response, next) => {
  if (!request.query.property) {
    response.status(400).json({
      msg: "property param required",
      error: "property param required!"
    });
  } else {
    try {
      const model = typeHelper(request.query.property);
      let commAll = await model.aggregate([
        {
          $group: { _id: { city: "$location.city", state: "$location.state" } }
        }
      ]);
      commAll = commAll.map(item => {
        return `${item._id.city},${item._id.state}`;
      });
      response.json([...commAll].sort());
    } catch (error) {
      response.status(400).json({ msg: "error getting cities", error });
    }
  }
};
exports.get_all_entries = async (request, response, next) => {
  if (!request.query.property) {
    response.status(400).json({
      msg: "property param required",
      error: "property param required!"
    });
  } else {
    try {
      const model = typeHelper(request.query.property);
      let page = 1;
      if (request.query.page && +request.query.page) {
        page = request.query.page;
      }
      let pagesize = 4;
      if (
        request.query.pagesize &&
        +request.query.pagesize &&
        +request.query.pagesize > 0
      ) {
        pagesize = +request.query.pagesize;
      }
      const doccount = await model.estimatedDocumentCount();
      const docs = await model
        .find()
        .sort({ _id: -1 })
        .skip((page - 1) * pagesize)
        .limit(pagesize);

      response.json({
        count: doccount,
        pages: Math.ceil(doccount / pagesize),
        docs
      });
    } catch (err) {
      response
        .status(400)
        .json({ msg: "error retrieving entries", error: err.message });
    }
  }
};

exports.get_all_bylocation = async (request, response, next) => {
  if (!request.query.property) {
    response.status(400).json({
      msg: "missing parameter",
      error: "property param required!"
    });
  } else {
    try {
      let queryfilter = {};
      if (request.query.city && request.query.state) {
        queryfilter = {
          ...queryfilter,
          "location.city": request.query.city,
          "location.state": request.query.state
        };
      }
      if (request.query.min) {
        queryfilter = {
          ...queryfilter,
          price: { ...queryfilter.price, $gte: request.query.min }
        };
      }
      if (request.query.max) {
        queryfilter = {
          ...queryfilter,
          price: { ...queryfilter.price, $lte: request.query.max }
        };
      }
      const model = typeHelper(request.query.property);
      let page = 1;
      if (request.query.page && +request.query.page) {
        page = request.query.page;
      }
      let pagesize = 4;
      if (
        request.query.pagesize &&
        +request.query.pagesize &&
        +request.query.pagesize > 0
      ) {
        pagesize = +request.query.pagesize;
      }
      const doccount = await model.countDocuments(queryfilter);
      const docs = await model
        .find(queryfilter)
        .sort({ _id: -1 })
        .skip((page - 1) * pagesize)
        .limit(pagesize);

      response.json({
        count: doccount,
        pages: Math.ceil(doccount / pagesize),
        docs
      });
    } catch (err) {
      response
        .status(400)
        .json({ msg: "error retrieving entries", error: err.message });
    }
  }
};

//
// TBD don't delete
//
// exports.get_all_bypricerange = (request, response, next) => {
//   Commercial.find({
//     price: { $gte: request.params.min, $lte: request.params.max }
//   })
//     .exec()
//     .then(doc => {
//       response.json(doc);
//     })
//     .catch(err => {
//       response.status(400).json({ msg: "error retrieving entries", err });
//     });
// };

// exports.get_all_bysquarefeet = (request, response, next) => {
//   Commercial.find({
//     squarefeet: { $gte: request.params.min, $lte: request.params.max }
//   })
//     .exec()
//     .then(doc => {
//       response.json(doc);
//     })
//     .catch(err => {
//       response.status(400).json({ msg: "error retrieving entries", err });
//     });
// };

exports.get_property_byid = async (request, response, next) => {
  if (!request.query.property || !request.query.id) {
    response.status(400).json({
      msg: "property and id params required",
      error: "property and id params required!"
    });
  } else {
    try {
      const model = typeHelper(request.query.property);
      const doc = await model.findById(request.query.id).exec();
      response.json(doc);
    } catch (error) {
      response.status(400).json({
        msg: `error retrieving entry by id ${request.query.id}`,
        error
      });
    }
  }
};
