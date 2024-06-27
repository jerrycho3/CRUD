const mongoose = require("mongoose");
require("dotenv").config();
const DB = process.env.DB
mongoose
  .connect(DB)

  .then(() => {
    console.log("connection to database successful");
  })

  .catch((error) => {
    console.log("something went wrong" + error.message);
  });
