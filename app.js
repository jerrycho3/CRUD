const express = require("express");
require("./config/db");
const authRoute = require("./routes/authRoutes");
const userRoute = require("./routes/authRoutes");

const app = express();

app.use(express.json({ extended: false }));

app.use("api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server is up and running on port.... ${PORT}`);
});
