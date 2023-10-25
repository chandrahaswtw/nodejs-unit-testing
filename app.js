require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const todoRoutes = require("./routes/todo-route");
const authRoutes = require("./routes/auth-route");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

// CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Allow-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});

app.use("/todo", todoRoutes);
app.use("/auth", authRoutes);

app.use((err, req, res, next) => {
  res.status(err?.statusCode || 500).json({ error: err?.message });
});

const PORT = process.env.PORT || 3000;

mongoose
  .connect(`${process.env.MONGO_URI}/todos?retryWrites=true&w=majority`)
  .then(() => {
    console.log("Successfully connected to Database");
    mongoose.set("debug", false);
    app.listen(3000, () => {
      console.log(`App started on port ${PORT}`);
    });
  })
  .catch((e) => {
    console.log("Connection to DB failed");
  });
