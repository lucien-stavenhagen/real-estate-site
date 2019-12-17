const {
  Commercial,
  Residential,
  Rental,
  Land
} = require("./models/RealEstateModels");

const PORT = process.env.PORT || 4001;
exports.PORT = PORT;
exports.HOST_URI = process.env.HOST_URI || `http://localhost:${PORT}`;
const dbName = "realestate";
exports.mongoURI =
  process.env.MONGODB_URI || `mongodb://localhost:27017/${dbName}`;
exports.publicDir = "uploads";
exports.imageFieldName = "imagepath";
//
// we'll need to put these in the
// store in the front end also, so we
// can control the inputs for these
// with dropdowns
//
exports.stateList = [
  "AK",
  "AL",
  "AR",
  "AZ",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "HI",
  "IA",
  "ID",
  "IL",
  "IN",
  "KS",
  "KY",
  "LA",
  "MA",
  "MD",
  "ME",
  "MI",
  "MN",
  "MO",
  "MS",
  "MT",
  "NE",
  "NC",
  "ND",
  "NH",
  "NJ",
  "NM",
  "NV",
  "NY",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VA",
  "VT",
  "WA",
  "WI",
  "WV",
  "WY"
];
exports.basisList = ["monthly", "weekly"];
exports.uploadFileLimit = 48;

exports.typeHelper = query => {
  if (query === "commercial") {
    return Commercial;
  } else if (query === "residential") {
    return Residential;
  } else if (query === "rental") {
    return Rental;
  } else if (query === "land") {
    return Land;
  } else {
    return null;
  }
};
