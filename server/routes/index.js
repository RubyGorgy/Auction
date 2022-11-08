const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();

router.post("/register", async function (req, res, next) {
  const { username, email } = req.body;
  let { password } = req.body;
  const userExists = await User.findOne({ email });

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
      const token = jwt.sign(
        { email, isAdmin: user.isAdmin },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      console.log(token);

      // save user token
      user.token = token;
      res.json({
        error: false,
        message: "login successfully",
        isAdmin: user.isAdmin,
        email: user.email,
        username: user.username,
        token: user.token,
      });
    } else {
      res.json({
        error: true,
        message: "email or password is wrong",
      });
    }
  } else {
    res.json({
      error: true,
      message: "email or password is wrong",
    });
  }
});

module.exports = router;
