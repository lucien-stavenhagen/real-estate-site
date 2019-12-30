const { PORT, atlasURI, mongoURI, publicDir } = require("./utils");

const express = require("express");
const app = express();
const cors = require("cors");
const datarouter = require("./routes/datarouter");
const userrouter = require("./routes/userrouter");
const mongoose = require("mongoose");
const compression = require("compression");
const fs = require("fs");
const path = require("path");

//
// load env vars from .env
//
require("dotenv").config();
//
// sync create uploads dir
// for images. Everything
// will break without it so
// synchronous check ok.
//
const uploadsDir = path.join(__dirname, publicDir);
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
  console.log(`created uploads dir ${uploadsDir}`);
} else {
  console.log(`uploads dir ${uploadsDir} found ok`);
}
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());
app.use(`/${publicDir}`, express.static(path.join(__dirname, publicDir)));

const autoIndex = process.env.NODE_ENV !== "production";

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex
  })
  .then(() => {
    console.log(`connected successfully. URL: ${mongoURI}`);
  })
  .catch(error => console.log(`connection failed!: ${error}`));

app.use("/api", datarouter);
app.use("/api/users", userrouter);
if (process.env.NODE_ENV === "production") {
  // setup static folder
  app.use(express.static(path.resolve(__dirname, "public")));
  // handle single page app
  app.get(/.*/, (request, response) => {
    response.sendFile(path.resolve(__dirname, "public", "index.html"));
  });
}
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
