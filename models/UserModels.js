const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  emailaddress: { type: String, required: true },
  password: { type: String, required: true }
});

exports.User = mongoose.model("User", usersSchema);
