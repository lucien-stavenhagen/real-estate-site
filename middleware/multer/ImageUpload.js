const multer = require("multer");
const { publicDir, imageFieldName } = require("../../utils");
const path = require("path");

const storage = multer.diskStorage({
  destination: function(request, file, cb) {
    cb(null, publicDir);
  },
  filename: function(request, file, cb) {
    cb(null, `img${Date.now()}-${file.originalname}`);
  }
});

const fileFilter = (request, file, cb) => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
exports.uploadMiddleware = multer({
  storage,
  fileFilter
});
