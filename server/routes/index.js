var express = require("express");
const User = require("../models/User");
var router = express.Router();
const bcrypt = require("bcrypt");

/* GET home page. */
router.get("/register", function (req, res, next) {
  User.find({})
    .then((data) => res.json(data))
    .catch(next);
});

router.post("/register", async function (req, res, next) {
  const { username, email } = req.body;
  let { password } = req.body;
  const userExists = await User.findOne({ email });

  console.log(userExists);
  if (!userExists) {
    console.log(password);
    password = await bcrypt.hash(password, 10);
    const user = {
      email,
      username,
      password,
    };
    User.create(user)
      .then(() => {
        res.json({
          error: false,
          message: "user registered successfully",
        });
      })
      .catch((err) => {
        res.json({
          error: true,
          message: "couldn't register user",
        });
      });
  } else {
    res.json({
      error: true,
      message: "user already registered",
    });
  }
});

router.post("/login", async function (req, res, next) {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    const result = await bcrypt.compare(password, user.password);

    if (result) {
      res.json({
        error: false,
        message: "login successfully",
      });
    } else {
      res.json({
        error: true,
        message: "email or password is wrong",
      });
    }
  }
});

module.exports = router;
