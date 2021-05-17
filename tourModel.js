const mongoose = require("mongoose");
const Tour = mongoose.model("Tour", {
  _id: mongoose.Schema.Types.ObjectId,
  title: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  description: { type: String, required: true },
  includes: { type: String, required: true },
  price: { type: Number, required: true },
  company: { type: mongoose.Schema.Types.ObjectId,ref: "User"},
  image: { type: String, required: true },
  seats: { type: Number, required: true },
});
module.exports = Tour;
