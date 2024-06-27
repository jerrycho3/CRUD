const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../model/userModel");

exports.signup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "user already exist",
      });
    }

    user = new User({
      fullName,
      email,
      password,
    });

    await user.save();

    const signToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    // success message
    res.status(201).json({
      message: "Account created successfully...",
      data: {
        user,
        signToken,
      },
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({
        message: "invalid credentials",
      });
    }

    const signToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    // success message
    res.status(201).json({
      message: "login successfully...",
      status: "success",
      data: {
        signToken,
      },
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
