const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const PlaceChema = new Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  address: String,
  photos: [String],
  description: String,
  perks: [String],
  extraInfo: String,
  checkIn: String,
  checkOut: String,
  maxGuests: Number,
  price: Number,
});

const PlaceModel = mongoose.model("Place", PlaceChema);

module.exports = PlaceModel;
