const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/User");

/* GET users listing. */

router.get("/withId/:id", async function (req, res, next) {
  const id = req.params.id;
  console.log(`got id ${id}`);
  const user = await User.findOne({ _id: id });
  if (!user) {
    res.status(404).json({
      message: `user not found`,
    });
  }

  res.json({
    user,
  });
});

//Create a one user
// router.post("/", async function (req, res, next) {
//   const newUserData = req.body;
//   console.log(newUserData);
//   const newUser = await User.create(newUserData);

//   if (!newUser) {
//     res.status(403).json({
//       message: `bad data User not created`,
//     });
//   }

//   res.json({
//     User: newUser,
//   });
// });

router.put("/withId/:id", function (req, res, next) {
  const userstID = req.params.id;
  const updateUserData = req.body;
  User.findByIdAndUpdate(userstID, updateUserData, (err, data) => {
    if (err) {
      res.status(400).json({
        message: `Couldn't update user`,
      });
    }

    console.log(data);
    res.json({
      User: data,
    });
  });
});

router.get("/withToken/:token", async (req, res) => {
  const { token } = req.params;
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    const user = await User.findOne({ email: decoded.email });
    res.json(user);
  } catch (err) {
    console.error(err);
    return res.status(401).send("Invlaid token");
  }
});

module.exports = router;
