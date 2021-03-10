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
  let tourCreator;
  Tour.findById(id)
    .populate("company")
    .then((data) => {
      console.log(`tour${JSON.stringify(data.company._id)}`);
      tourCreator = data.company._id;
      console.log(`tourcr${tourCreator}`);
    });

  // if (req.userData.userId === req.body.editedTourData.company)
  Tour.deleteOne({ _id: id }).then((tour) => {
    if (tour) {
      console.log(`requserdatauserid${req.userData.userId}`);
      res.json({ status: "deleted" });
    } else {
      res.json({ status: "error" });
    }
  });
});
// app.get("/tours/:id/edit", checkAuth, (req, res) => {
//   const { id } = req.params;
//   stringify(Tour.findById(id).then((data) => res.send(data)).catch((err) => {
//     res.status(401).json({ error: err });
//   }));
// });

app.put("/tours/:id/edit", checkAuth, (req, res) => {
  if (req.userData.userId === req.body.editedTourData.company) {
    Tour.findByIdAndUpdate(
      req.params.id,
      { $set: req.body.editedTourData },
      (err) => {
        if (err) {
          res.send(err);
        }
        res.status(200).json({ status: "updated" });
      }
    );
  } else {
    return res.status(401).json({
      message: "Auth failed",
    });
  }
});

app.post("/tours", checkAuth, upload.single("image"), (req, res) => {
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
    .then(() => res.status(201).json({ message: "Tour added" }))
    .catch(() => {
      res.status(500).json({ message:"Tour is not added" });
    });
});

app.get("/bookings", checkAuth, (req, res) => {
  Booking.find()
    .populate("tour")
    .then((bookings) => {
      const userBookings = bookings.filter(
        (booking) => booking.tour && booking.tour.company == req.userData.userId
      );

      res.status(200).json(userBookings);
    })
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
    company: data.company,
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
            return res.status(500).json({ message: "message" });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
              companyName: req.body.companyName,
            });
            user
              .save()
              .then((result) => {
                const token = jwt.sign(
                  { email: result.email, userId: result._id },
                  "secret",
                  { expiresIn: "1h" }
                );
                return res.status(201).json({
                  message: "User created",
                  token: token,
                  user: { userId: result._id, companyName: result.companyName },
                });
              })
              .catch(() => {
                res.status(501).json({ message: "Adding user is failed" });
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
          return res.status(200).json({
            message: "Auth succesful",
            token: token,
            user: { userId: user[0]._id, companyName: user[0].companyName },
          });
        }
        res.status(401).json({ message: "Auth failed" });
      });
    })
    .catch(() => {
      res.status(500).json({ message: "Auth failed" });
    });
});

app.listen(5000, () => {
  console.log("server is running");
});
