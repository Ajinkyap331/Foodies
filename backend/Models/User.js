const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  email: String,
  password: String,
  mess: String,
  owner: Boolean,
});

module.exports = mongoose.model("user", UserSchema);
