const mongoose = require("mongoose");

const MessSchema = mongoose.Schema({
  id: String,
  name: String,
  location: String,
  menu: [
    {
      name: String,
      price : Number,
      available : Boolean
    },
  ],
  rating: Number,
});

module.exports = mongoose.model("mess", MessSchema);
