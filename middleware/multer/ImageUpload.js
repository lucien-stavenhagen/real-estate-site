const multer = require("multer");
const { publicDir, imageFieldName } = require("../../utils");
const path = require("path");
const diskParams = multer.diskStorage({
  destination: function(request, file, cb) {
    cb(null, publicDir);
  },
  filename: function(request, file, cb) {
    cb(null, `img${Date.now()}-${file.originalname}`);
  }
});

exports.uploadMiddleware = multer({
  storage: diskParams
});
