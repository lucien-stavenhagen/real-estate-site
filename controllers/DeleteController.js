const {
  Commercial,
  Residential,
  Rental,
  Land
} = require("../models/RealEstateModels");
const mongoose = require("mongoose");
const fs = require("fs");

const responseHelper = (msg, filestatus, doc, error) => {
  return {
    msg,
    filestatus,
    doc,
    error
  };
};
//
// commercial
//

exports.delete_commercial_byid = (request, response, next) => {
  Commercial.findByIdAndRemove(request.params.id, {
    useFindAndModify: false
  })
    .exec()
    .then(doc => {
      const filestatus = [];
      doc.images.forEach(item => {
        if (fs.existsSync(item.filename)) {
          fs.unlinkSync(item.filename);
          filestatus.push(`${item.filename} deleted`);
        } else {
          filestatus.push(
            `${item.filename} not found, nothing deleted off server.`
          );
        }
      });
      response.json(
        responseHelper(
          "successfully removed commercial entry",
          filestatus,
          doc,
          null
        )
      );
    })
    .catch(err => {
      response
        .status(400)
        .json(responseHelper("error removing entry", null, null, err));
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
      const filestatus = [];
      doc.images.forEach(item => {
        if (fs.existsSync(item.filename)) {
          fs.unlinkSync(item.filename);
          filestatus.push(`${item.filename} deleted`);
        } else {
          filestatus.push(
            `${item.filename} not found, nothing deleted off server.`
          );
        }
      });
      response.json(
        responseHelper(
          "successfully removed residential entry",
          filestatus,
          doc,
          null
        )
      );
    })
    .catch(err => {
      response
        .status(400)
        .json(responseHelper("error removing entry", null, null, err));
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
      const filestatus = [];
      doc.images.forEach(item => {
        if (fs.existsSync(item.filename)) {
          fs.unlinkSync(item.filename);
          filestatus.push(`${item.filename} deleted`);
        } else {
          filestatus.push(
            `${item.filename} not found, nothing deleted off server.`
          );
        }
      });
      response.json(
        responseHelper(
          "successfully removed rental entry",
          filestatus,
          doc,
          null
        )
      );
    })
    .catch(err => {
      response
        .status(400)
        .json(responseHelper("error removing entry", null, null, err));
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
      const filestatus = [];
      doc.images.forEach(item => {
        if (fs.existsSync(item.filename)) {
          fs.unlinkSync(item.filename);
          filestatus.push(`${item.filename} deleted`);
        } else {
          filestatus.push(
            `${item.filename} not found, nothing deleted off server.`
          );
        }
      });
      response.json(
        responseHelper("successfully removed land entry", filestatus, doc, null)
      );
    })
    .catch(err => {
      response
        .status(400)
        .json(responseHelper("error removing entry", null, null, err));
    });
};
