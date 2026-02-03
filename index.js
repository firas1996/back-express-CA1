const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
dotenv.config({ path: "./.env" });
mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log("Connection to the DB secured !!!!");
  })
  .catch((e) => {
    console.log("Error: " + e);
  });
const app = express();
app.use(express.json());
app.use("/users", userRoutes);
const port = 1122;
app.listen(port, () => {
  console.log("The server is running !!!!");
});
