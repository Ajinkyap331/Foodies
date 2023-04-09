const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  email: String,
  password: String,
  messid: String,
  messname: String,
  location: String,
  rating: Number,
  menu: [
    {
      name: String,
      price: Number,
      available: Boolean,
    },
  ],
});

module.exports = mongoose.model("user", UserSchema);
