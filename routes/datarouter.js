const express = require("express");
const router = express.Router();
const createController = require("../controllers/CreateController");
const readController = require("../controllers/ReadController");
const updateController = require("../controllers/UpdateController");
const deleteController = require("../controllers/DeleteController");
const { uploadMiddleware } = require("../middleware/multer/ImageUpload");
const { imageFieldName, uploadFileLimit } = require("../utils");

//////////////////////////////
// routes for all proptypes
// but by other attributes like
// city, price, etc.
//
// router.get("/all", readController.get_all);
// router.get("/all/cities", readController.get_union_of_all_cities_indb);

// router.get("/all/city/:city/state/:state", readController.get_all_bycity);
// router.get(
//   "/all/bypricerange/min/:min/max/:max",
//   readController.get_all_bypricerange
// );
// router.get(
//   "/all/byrentrange/min/:min/max/:max",
//   readController.get_all_byrentrange
// );
//
// read for all properties
//
//
// paginated now
//
router.get("/property", readController.get_all_entries);

router.get("/propertybyid", readController.get_property_byid);
router.get("/cities/property", readController.get_all_cities);
//
// params: city, state required, page default 1, pagesize default 4
//
router.get("/location/property", readController.get_all_bylocation);

router.get(
  "/commercial/pricerange/min/:min/max/:max",
  readController.get_all_bypricerange
);
router.get(
  "/commercial/squarefeet/min/:min/max/:max",
  readController.get_all_bysquarefeet
);

//
// end routes for all
//////////////////////////////

//
// specific routes for each property type
//

//////////////////////////////
// routes for commercial
//

// create

router.post(
  "/commercial",
  uploadMiddleware.array(imageFieldName, uploadFileLimit),
  createController.create_commercial_entry
);

// update

router.patch(
  "/commercial/:id/addphotos",
  uploadMiddleware.array(imageFieldName, uploadFileLimit),
  updateController.add_images_commercial_byid
);
router.delete(
  "/commercial/:id/deletephoto/:imageid/imagepath/:imagepath",
  updateController.delete_commercial_image_byid
);

router.patch("/commercial/:id/update", updateController.update_commercial_byid);

// delete

router.delete("/commercial/:id", deleteController.delete_commercial_byid);

//
// end commercial
//////////////////////////////

//////////////////////////////
// routes for residential
//

// create

router.post(
  "/residential",
  uploadMiddleware.array(imageFieldName, uploadFileLimit),
  createController.create_residential_entry
);

// update

router.patch(
  "/residential/:id/addphotos",
  uploadMiddleware.array(imageFieldName, uploadFileLimit),
  updateController.add_images_residential_byid
);
router.delete(
  "/residential/:id/deletephoto/:imageid/imagepath/:imagepath",
  updateController.delete_residential_image_byid
);

router.patch(
  "/residential/:id/update",
  updateController.update_residential_byid
);

// // delete

router.delete("/residential/:id", deleteController.delete_residential_byid);

// //
// // end residential
// //////////////////////////////

// //////////////////////////////
// // routes for rental
// //

// // create

router.post(
  "/rental",
  uploadMiddleware.array(imageFieldName, uploadFileLimit),
  createController.create_rental_entry
);

// update

router.patch(
  "/rental/:id/addphotos",
  uploadMiddleware.array(imageFieldName, uploadFileLimit),
  updateController.add_images_rental_byid
);
router.delete(
  "/rental/:id/deletephoto/:imageid/imagepath/:imagepath",
  updateController.delete_rental_image_byid
);

router.patch("/rental/:id/update", updateController.update_rental_byid);

// delete

router.delete("/rental/:id", deleteController.delete_rental_byid);

// //
// // end rental
// //////////////////////////////

// //////////////////////////////
// // routes for land
// //

// // create

router.post(
  "/land",
  uploadMiddleware.array(imageFieldName, uploadFileLimit),
  createController.create_land_entry
);

// update

router.patch(
  "/land/:id/addphotos",
  uploadMiddleware.array(imageFieldName, uploadFileLimit),
  updateController.add_images_land_byid
);

router.delete(
  "/land/:id/deletephoto/:imageid/imagepath/:imagepath",
  updateController.delete_land_image_byid
);

router.patch("/land/:id/update", updateController.update_land_byid);

// delete

router.delete("/land/:id", deleteController.delete_land_byid);

//
// end land
//////////////////////////////

module.exports = router;
