exports.PORT = process.env.PORT || 4001;
const dbName = "realestate";
exports.mongoURI =
  process.env.MONGODB_URI || `mongodb://localhost:27017/${dbName}`;
exports.publicDir = "uploads";
exports.imageFieldName = "imagepath";
