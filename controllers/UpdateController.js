const { typeHelper } = require("../utils");

const mongoose = require("mongoose");
const fs = require("fs");
const { HOST_URI } = require("../utils");
//
// commercial
//
exports.add_images_by_proptype_and_id = (request, response, next) => {
  const model = typeHelper(request.params.proptype);

  const imglist = request.files.map(item => {
    return {
      _id: mongoose.Types.ObjectId(),
      filename: item.path,
      source: `${HOST_URI}/${item.path}`
    };
  });
  model
    .updateOne(
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
// "/patchprop/proptype/:proptype/propid/:propid/deletephoto/:imageid/imagepath/:imagepath",
exports.delete_property_image_by_type_and_id = (request, response, next) => {
  const model = typeHelper(request.params.proptype);
  const imagepath = decodeURIComponent(request.params.imagepath);
  model
    .updateOne(
      {
        _id: request.params.propid
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

exports.update_property_by_type_and_id = (request, response, next) => {
  const model = typeHelper(request.params.proptype);
  model
    .updateOne({ _id: request.params.id }, request.body)
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
