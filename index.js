const { PORT, mongoURI, publicDir } = require("./utils");

const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./routes/router");
const mongoose = require("mongoose");
const compression = require("compression");
const fs = require("fs");
const path = require("path");
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

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log(`connected successfully. URL: ${mongoURI}`);
  })
  .catch(error => console.log(`connection failed!: ${error}`));

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
