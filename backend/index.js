const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const TourModel = require("./model");

var cors = require("cors");
const app = express();
mongoose.connect("mongodb://localhost/tours", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

app.get("/tours", (req, res) => {
  TourModel.find().then((err, tours) => {
    if (err) {
      res.send(err);
    }
    res.json(tours);
  });
});

app.delete("/tours/:id", (req, res) => {
  TourModel.remove({
    _id: req.params.id,
  }).then((tour) => {
    if (tour) {
      res.json({ status: "deleted" });
    } else {
      res.json({ status: "error" });
    }
  });
});
app.put("/tours/:id", (req, res) => {
  TourModel.findByIdAndUpdate(req.params.id, { $set: req.body }, (err) => {
    if (err) {
      res.send(err);
    }
    res.json({ status: "updated" });
  });
});

app.post("/tours", (req, res) => {
  const data = req.body;
  const tour = new TourModel({
    card: data.card,
    title: data.title,
    startDate: data.startDate,
    endDate: data.endDate,
    description: data.description,
    includes: data.includes,
    price: data.price,
    company: data.company,
  });
  tour.save().then(() => res.send({ status: "ok" }));
});

app.listen(3333, () => {
  console.log("server is running");
});
