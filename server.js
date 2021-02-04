const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Tour = require("./tourModel");
const User = require("./userModel");
const Booking = require("./bookingModel");
const stringify = require("json-stringify-safe");
const cors = require("cors");
const multer = require("multer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
const checkAuth = require("./check-auth");

app.use("/uploads", express.static("uploads"));

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
    cb(null, new Date().toISOString() + file.originalname);
  },
});
const upload = multer({ storage: storage });

app.get("/tours", (req, res) => {
  Tour.find()
    .populate("company")
    .then((tours) => res.status(200).json(tours))
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

app.get("/tours/:id", (req, res) => {
  const { id } = req.params;

  stringify(
    Tour.findById(id)
      .populate("company")
      .then((data) => res.send(data))
  );
});

app.delete("/tours/:id", checkAuth, (req, res) => {
  const { id } = req.params;

  Tour.deleteOne({ _id: id }).then((tour) => {
    if (tour) {
      res.json({ status: "deleted" });
    } else {
      res.json({ status: "error" });
    }
  });
});
app.get("/tours/:id/edit", checkAuth, (req, res) => {
  const { id } = req.params;
  stringify(Tour.findById(id).then((data) => res.send(data)));
});

app.put("/tours/:id/edit", (req, res) => {
  Tour.findByIdAndUpdate(req.params.id, { $set: req.body }, (err) => {
    if (err) {
      res.send(err);
    }
    res.json({ status: "updated" });
  });
});

app.post("/tours", upload.single("image"), (req, res) => {
  const path = req.file ? req.file.path : null;

  const data = req.body;
  const tour = new Tour({
    _id: new mongoose.Types.ObjectId(),
    title: data.title,
    startDate: data.startDate,
    endDate: data.endDate,
    description: data.description,
    includes: data.includes,
    price: data.price,
    company: data.company,
    image: path,
    seats: data.seats,
  });
  tour
    .save()
    .then(() => res.send({ status: "ok" }))
    .catch((err) => {
      res.send(err);
    });
});

app.get("/bookings", (req, res) => {
  Booking.find()
    .populate("tour")
    .then((bookings) => res.status(200).json(bookings))
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});
app.post("/bookings", (req, res) => {
  const data = req.body;
  console.log(data);
  const booking = new Booking({
    _id: new mongoose.Types.ObjectId(),
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    phone: data.phone,
    seats: data.seats,
    tour: data.tour,
    // company: data.company,
  });
  booking
    .save()
    .then(() => res.status(201).json({ message: " Booking created" }))
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

app.post("/signup", (req, res) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(409).json({ message: "Mail exists" });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              companyName: req.body.companyName,
              email: req.body.email,
              password: hash,
            });
            user
              .save()
              .then((result) => {
                console.log(result);
                res.status(201).json({ message: "User created" });
              })
              .catch((err) => {
                console.log(err);
                res.status(500).json({ error: err });
              });
          }
        });
      }
    });
});

app.post("/login", (req, res) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({ message: "Auth failed" });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed",
          });
        }
        if (result) {
          const token = jwt.sign(
            { email: user[0].email, userId: user[0]._id },
            "secret",
            { expiresIn: "1h" }
          );
          return res
            .status(200)
            .json({ message: "Auth succesful", token: token });
        }
        res.status(401).json({ message: "Auth failed" });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

app.listen(5000, () => {
  console.log("server is running");
});
