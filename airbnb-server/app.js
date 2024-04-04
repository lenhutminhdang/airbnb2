const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("./models/User");
const Place = require("./models/Place");
const Booking = require("./models/Booking");

const cookieParser = require("cookie-parser");

const app = express();
const port = process.env.PORT || 3000;
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = process.env.JWT;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

mongoose.connect(process.env.MONGO_URL);

function getUserDataFromReq(req) {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;

      resolve(userData);
    });
  });
}

app.get("/", (req, res) => {
  res.json("get /");
});

app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
  } catch (error) {
    res.status(422).json(error);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const userDoc = await User.findOne({ email });

  if (userDoc) {
    const passwordOK = bcrypt.compareSync(password, userDoc.password);
    if (passwordOK) {
      jwt.sign(
        { email: userDoc.email, id: userDoc._id },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(userDoc);
        }
      );
    } else {
      res.status(422).json("password not ok");
    }
  } else {
    res.json("not found user");
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;

      const { name, email, _id } = await User.findById(userData.id);

      res.json({ name, email, _id });
    });
  } else {
    res.json(null);
  }
});

app.get("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

app.post("/places", (req, res) => {
  const { token } = req.cookies;

  const {
    title,
    address,
    photos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;

    const placeDoc = await Place.create({
      owner: userData.id,
      title,
      address,
      photos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    });

    res.json(placeDoc);
  });
});

app.get("/user-places", (req, res) => {
  const { token } = req.cookies;

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;

    const placesDoc = await Place.find({
      owner: userData.id,
    });

    res.json(placesDoc);
  });
});

app.get("/places/:placeId", async (req, res) => {
  const { placeId } = req.params;
  res.json(await Place.findById(placeId));
});

app.put("/places", async (req, res) => {
  const { token } = req.cookies;
  const {
    placeId,
    title,
    address,
    photos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;

    const placeDoc = await Place.findById(placeId);
    if (userData.id === placeDoc.owner.toString()) {
      placeDoc.set({
        title,
        address,
        photos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      });
      placeDoc.save();
      res.json("ok");
    }
  });
});

app.get("/places", async (req, res) => {
  res.json(await Place.find());
});

app.post("/bookings", async (req, res) => {
  const { place, checkIn, checkOut, name, phone, price } = req.body;

  const userData = await getUserDataFromReq(req);

  Booking.create({
    owner: userData.id,
    place,
    checkIn,
    checkOut,
    name,
    phone,
    price,
  })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.get("/bookings", async (req, res) => {
  const userData = await getUserDataFromReq(req);

  res.json(
    await Booking.find({
      owner: userData.id,
    }).populate("place")
  );
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
