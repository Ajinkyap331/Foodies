const mongoose = require("mongoose");

const MenuSchema = mongoose.Schema({
    name: String,
    price: Number,
    available: Boolean,
    hotelid : String 
});

module.exports = mongoose.model("menu", MenuSchema);