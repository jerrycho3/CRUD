const User = require("../model/userModel");
const bycrypt = require("bcryptjs");

//create a new user

exports.createUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    //check if the user already exists
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({
        message: "user already exists",
      });
    }

    //create a new user instance
    const newUser = new User({
      fullName,
      email,
      password,
    });

    //save the user to the database
    await newUser.save();

    //send a success response
    res.status(201).json({
      status: "success",
      newUser,
    });
  } catch (error) {
    res.status(500).json({
      error: "internal server error" + error.message,
    });
  }
};

//get current user profile

exports.getUser = async (req, res) => {
  try {
    //fetch the profil based on the user id stored in the request object(from JWT)
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      res.status(404).json({
        message: "user not found",
      });
    } else {
      //return a success response and the user profile
      res.status(400).json({
        status: "success",

        user,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "internal server error" + error.message,
    });
  }
};

// update user profile

exports.updateUser = async (req, res) => {
  try {
    //update user profile
    const { fullName, password } = req.body;

    let user = await User.findById(req.user.id);
    if (!user) {
      res.status(404).json({
        message: "user not found",
      });
    }

    //update fullName if provided
    if (fullName) {
      user.fullName = fullName;
    }

    //update password if provided
    if (password) {
      const salt = await bcrypt.genSalt(12);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();

    // return a success response and updated user profile
    res.status(400).json({
      status: "success",
      user,
    });
  } catch (error) {
    res.status(500).json({
      error: "internal server error" + error.message,
    });
  }
};

// delete user profile

exports.deleteUser = async (req, res) => {
  try {
    // find the user by id and delete
    await User.findByIdAndRemove(req.user.id);

    res.status(200).json({
      message: "user deleted",
    });
  } catch (error) {
    res.status(500).json({
      error: "internal server error" + error.message,
    });
  }
};
