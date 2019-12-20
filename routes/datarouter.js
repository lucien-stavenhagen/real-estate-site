const express = require("express");
const router = express.Router();
const createController = require("../controllers/CreateController");
const readController = require("../controllers/ReadController");
const updateController = require("../controllers/UpdateController");
const deleteController = require("../controllers/DeleteController");
const { uploadMiddleware } = require("../middleware/multer/ImageUpload");
const { imageFieldName, uploadFileLimit } = require("../utils");
const { verifyUser } = require("../middleware/auth/verifyUser");

//////////////////////////////
// routes for all proptypes
//

//
// read
//

router.get("/property", readController.get_all_entries);

router.get("/propertybyid", readController.get_property_byid);
router.get("/cities/property", readController.get_all_cities);
//
// params: city, state required, page default 1, pagesize default 4
//
router.get("/location/property", readController.get_all_bylocation);

//
// TBD don't delete
//

// router.get(
//   "/commercial/pricerange/min/:min/max/:max",
//   readController.get_all_bypricerange
// );
// router.get(
//   "/commercial/squarefeet/min/:min/max/:max",
//   readController.get_all_bysquarefeet
// );

// update

router.patch(
  "/patchprop/proptype/:proptype/id/:id/addphotos",
  uploadMiddleware.array(imageFieldName, uploadFileLimit),
  updateController.add_images_by_proptype_and_id
);

router.delete(
  "/patchprop/proptype/:proptype/propid/:propid/deletephoto/:imageid/imagepath/:imagepath",
  updateController.delete_property_image_by_type_and_id
);

router.patch(
  "/patchprop/proptype/:proptype/id/:id/updateinfo",
  updateController.update_property_by_type_and_id
);

//
// delete property
//

router.delete(
  "/deleteprop/proptype/:proptype/id/:id",
  deleteController.delete_property_bytype_and_id
);

//
// end routes for all
//////////////////////////////

//
// specific routes for each property type
//

// create commercial

router.post(
  "/commercial",
  uploadMiddleware.array(imageFieldName, uploadFileLimit),
  createController.create_commercial_entry
);

// create residential

router.post(
  "/residential",
  uploadMiddleware.array(imageFieldName, uploadFileLimit),
  createController.create_residential_entry
);

// create rental

router.post(
  "/rental",
  uploadMiddleware.array(imageFieldName, uploadFileLimit),
  createController.create_rental_entry
);

// create land

router.post(
  "/land",
  uploadMiddleware.array(imageFieldName, uploadFileLimit),
  createController.create_land_entry
);

module.exports = router;
