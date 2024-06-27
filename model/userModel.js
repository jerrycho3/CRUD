const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

//create a schema

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "please tell us your name!"],
    },

    email: {
      type: String,
      required: [true, "please provide your email!"],
      unique: true,
      lowerCase: true,
      //validte the users email to be in the right format,we will call the isEmail method on d validator object
      validate: [validator.isEmail, "please provide a valid email !"],
    },

    password: {
      type: String,
      required: [true, "please provide a password!"],
      minLength: 8,
      //this select wont allow the password results show up to the client
      Select: false,
    },
  },
  { timeStamp: true }
);

userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("user", userSchema);
