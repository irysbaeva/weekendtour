const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Tour = require("./model");
const stringify = require("json-stringify-safe");
const cors = require("cors");
const multer = require("multer");
const app = express();

mongoose.connect("mongodb://localhost/tours", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null,new Date().toISOString()+ file.originalname);
  },
});
const upload = multer({ storage: storage });

app.get("/tours", (req, res) => {
  Tour.find().then((err, tours) => {
    if (err) {
      res.send(err);
    }
    res.json(tours);
  });
});

app.get("/tours/:id", (req, res) => {
  const { id } = req.params;
  stringify(Tour.findById(id).then((data) => res.send(data)));
});

app.delete("/tours/:id", (req, res) => {
  const { id } = req.params;
  Tour.deleteOne({ _id: id }).then((tour) => {
    if (tour) {
      res.json({ status: "deleted" });
    } else {
      res.json({ status: "error" });
    }
  });
});

// app.put("/tours/:id", (req, res) => {
//   Tour.findByIdAndUpdate(req.params.id, { $set: req.body }, (err) => {
//     if (err) {
//       res.send(err);
//     }
//     res.json({ status: "updated" });
//   });
// });

app.post("/tours", 
// upload.single("image"),
 (req, res) => {
  console.log(req.file);

  const data = req.body;
  const tour = new Tour({
    title: data.title,
    startDate: data.startDate,
    endDate: data.endDate,
    description: data.description,
    includes: data.includes,
    price: data.price,
    company: data.company,
    // image: req.file.path,
  });
  tour.save().then(() => res.send(({ status: "ok" })));
});

app.listen(3333, () => {
  console.log("server is running");
});
