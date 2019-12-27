const { typeHelper } = require("../utils");
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

exports.delete_property_bytype_and_id = (request, response, next) => {
  const { model } = typeHelper(request.params.proptype);
  model
    .findByIdAndRemove(request.params.id, {
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
