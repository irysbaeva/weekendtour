const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/tours");
const Tour = mongoose.model("Tour", {
  id: String,
  title: String,
  startDate: String,
  endDate: String,
  description: String,
  includes: String,
  price: String,
  company: String,
  image: String
});
module.exports = Tour;
