const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/tours");
const Tour = mongoose.model("Tour", {
  _id: mongoose.Schema.Types.ObjectId,
  title: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  description: { type: String, required: true },
  includes: { type: String, required: true },
  price: { type: Number, required: true },
  company: String,
  image: { type: String, required: true },
});
module.exports = Tour;
