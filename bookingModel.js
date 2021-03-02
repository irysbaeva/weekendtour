const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/tours");
const Booking = mongoose.model("Booking", {
  _id: mongoose.Schema.Types.ObjectId,
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  seats: { type: Number, required: true },
  tour: { type: mongoose.Schema.Types.ObjectId, ref: "Tour" },
  company: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});
module.exports = Booking;
