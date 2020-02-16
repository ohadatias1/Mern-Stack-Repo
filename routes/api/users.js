const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");

// @route   POST api/user
// @desc    Register User , authenticate user and get json web token
// @access  Public
router.post(
  "/",
  [
    check("name", "Name Is Required!") // from documentation - check each paramter from User model if its valid
      .not()
      .isEmpty(),
    check("email", "Please Enter Your Email Address").isEmail(),
    check(
      "password",
      "Please enter valid password with 6 or more characters"
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req); //save all errors in array - then check if the array is empty
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;

    try {
      // check if user exist
      let user = await User.findOne({ email });
      if (user) {
        res.status(400).json({ errors: [{ msg: "User already exists" }] });
      }
      // Get user gravatar - the picture from the email account
      const avatar = gravatar.url(email, {
        size: "200px",
        rank: "pg",
        d: "mm"
      });
      // define new user
      user = new User({ name, email, password, avatar });

      // encrypt passwaord using bcrypt
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      // save user to the db
      await user.save();

      //return JSON WEB TOKEN
      const payload = {
        user: {
          id: user.id
        }
      };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
