const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/tours");
const Tour = mongoose.model("Tour", {
  id: String,
  title: String,
  startDate: Date,
  endDate:  Date,
  description: String,
  includes: String,
  price: Number,
  company: String,
  image: String
});
module.exports = Tour;
