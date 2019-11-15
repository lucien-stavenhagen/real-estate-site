const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./routes/router");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 4001;

app.use(cors());
app.use(express.json());
const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017";
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log(`connected successfully. URL: ${mongoURI}`);
  })
  .catch(error => console.log(`connection failed!: ${error}`));
// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection failure!"));
// db.once("open", () => {
//   console.log("connected successfully!");
// });
app.use("/api", router);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
