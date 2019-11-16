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
router.post("/commercial", createController.create_commercial_entry);
router.get("/commercial", readController.get_all_commercial_entries);
router.get("/commercial/:id", readController.get_commercial_byid);
router.get(
  "/commercial/location/:location",
  readController.get_all_commercial_bylocation
);
router.patch(
  "/commercial/:id/source/:source/caption/:caption",
  updateController.add_images_commercial_byid
);

//
// routes for residentil
//
router.post(
  "/residential",
  uploadMiddleware.single(imageFieldName),
  createController.create_residential_entry
);

//
// routes for rental
//
router.post("/rental", createController.create_rental_entry);

//
// routes for land
//
router.post("/land", createController.create_land_entry);

module.exports = router;
