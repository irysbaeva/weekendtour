const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/tours");
const Tour = mongoose.model("Tour", {
  card: Number,
  title: String,
  startDate: String,
  endDate: String,
  description: String,
  includes: String,
  price: Number,
  company: String,
});
module.exports= Tour;