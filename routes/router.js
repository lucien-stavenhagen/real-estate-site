const express = require("express");
const router = express.Router();
const createController = require("../controllers/CreateController");
const readController = require("../controllers/ReadController");
const updateController = require("../controllers/UpdateController");
const { uploadMiddleware } = require("../middleware/multer/ImageUpload");
const { imageFieldName } = require("../utils");

//
// routes for commercial
//

//
// create
//
router.post(
  "/commercial",
  uploadMiddleware.single(imageFieldName),
  createController.create_commercial_entry
);
//
// read
//
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

//
// update
//
router.patch(
  "/commercial/:id",
  uploadMiddleware.single(imageFieldName),
  updateController.add_images_commercial_byid
);

//
// routes for residential
//

//
// create
//
router.post(
  "/residential",
  uploadMiddleware.single(imageFieldName),
  createController.create_residential_entry
);
//
// read
//
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

//
// update
//
router.patch(
  "/residential/:id",
  uploadMiddleware.single(imageFieldName),
  updateController.add_images_residential_byid
);

//
// routes for rental
//
router.post(
  "/rental",
  uploadMiddleware.single(imageFieldName),
  createController.create_rental_entry
);

//
// read
//
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

//
// update
//
router.patch(
  "/rental/:id",
  uploadMiddleware.single(imageFieldName),
  updateController.add_images_rental_byid
);

//
// routes for land
//
router.post(
  "/land",
  uploadMiddleware.single(imageFieldName),
  createController.create_land_entry
);

//
// read
//
router.get("/land", readController.get_all_land_entries);
router.get("/land/:id", readController.get_land_byid);
router.get(
  "/land/ocation/city/:city/state/:state",
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
//
// update
//
router.patch(
  "/land/:id",
  uploadMiddleware.single(imageFieldName),
  updateController.add_images_land_byid
);

module.exports = router;
