const express = require("express");
const router = express.Router();
const createController = require("../controllers/CreateController");
const readController = require("../controllers/ReadController");
const updateController = require("../controllers/UpdateController");
const deleteController = require("../controllers/DeleteController");
const { uploadMiddleware } = require("../middleware/multer/ImageUpload");
const { imageFieldName } = require("../utils");

//////////////////////////////
// routes for commercial
//

// create

router.post(
  "/commercial",
  uploadMiddleware.single(imageFieldName),
  createController.create_commercial_entry
);

// read

router.get("/commercial", readController.get_all_commercial_entries);
router.get("/commercial/:id", readController.get_commercial_byid);
router.get(
  "/commercial/location/city/:city/state/:state",
  readController.get_all_commercial_bylocation
);
router.get(
  "/commercial/pricerange/min/:min/max/:max",
  readController.get_all_commercial_bypricerange
);
router.get(
  "/commercial/squarefeet/min/:min/max/:max",
  readController.get_all_commercial_bysquarefeet
);

// update

router.patch(
  "/commercial/:id/photos",
  uploadMiddleware.single(imageFieldName),
  updateController.add_images_commercial_byid
);

router.patch(
  "/commercial/:id/price/:price",
  updateController.update_price_commercial_byid
);
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
  uploadMiddleware.single(imageFieldName),
  createController.create_residential_entry
);

// read

router.get("/residential", readController.get_all_residential_entries);
router.get("/residential/:id", readController.get_residential_byid);
router.get(
  "/residential/location/city/:city/state/:state",
  readController.get_all_residential_bylocation
);
router.get(
  "/residential/pricerange/min/:min/max/:max",
  readController.get_all_residential_bypricerange
);
router.get(
  "/residential/beds/:beds/baths/:baths",
  readController.get_all_residential_bybedsandbaths
);

// update

router.patch(
  "/residential/:id/photos",
  uploadMiddleware.single(imageFieldName),
  updateController.add_images_residential_byid
);

router.patch(
  "/residential/:id/price/:price",
  updateController.update_price_residential_byid
);

// delete

router.delete("/residential/:id", deleteController.delete_residential_byid);

//
// end residential
//////////////////////////////

//////////////////////////////
// routes for rental
//

// create

router.post(
  "/rental",
  uploadMiddleware.single(imageFieldName),
  createController.create_rental_entry
);

// read

router.get("/rental", readController.get_all_rental_entries);
router.get("/rental/:id", readController.get_rental_byid);
router.get(
  "/rental/location/city/:city/state/:state",
  readController.get_all_rental_bylocation
);
router.get(
  "/rental/pricerange/basis/:basis/min/:min/max/:max",
  readController.get_all_rental_bypricerange
);

router.get(
  "/rental/beds/:beds/baths/:baths",
  readController.get_all_rental_bybedsandbaths
);

// update

router.patch(
  "/rental/:id/photos",
  uploadMiddleware.single(imageFieldName),
  updateController.add_images_rental_byid
);
router.patch(
  "/rental/:id/price/:price",
  updateController.update_price_rental_byid
);

// delete

router.delete("/rental/:id", deleteController.delete_rental_byid);

//
// end rental
//////////////////////////////

//////////////////////////////
// routes for land
//

// create

router.post(
  "/land",
  uploadMiddleware.single(imageFieldName),
  createController.create_land_entry
);

// read

router.get("/land", readController.get_all_land_entries);
router.get("/land/:id", readController.get_land_byid);
router.get(
  "/land/location/city/:city/state/:state",
  readController.get_all_land_bylocation
);
router.get(
  "/land/pricerange/min/:min/max/:max",
  readController.get_all_land_bypricerange
);

router.get(
  "/land/acreage/min/:min/max/:max",
  readController.get_all_land_byacreage
);

// update

router.patch(
  "/land/:id/photos",
  uploadMiddleware.single(imageFieldName),
  updateController.add_images_land_byid
);
router.patch("/land/:id/price/:price", updateController.update_price_land_byid);

// delete

router.delete("/land/:id", deleteController.delete_land_byid);

//
// end land
//////////////////////////////

module.exports = router;
