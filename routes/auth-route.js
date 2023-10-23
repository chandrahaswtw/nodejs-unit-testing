const express = require("express");
const {
  createUser,
  authenticateUser,
} = require("./../controllers/auth-controller");

const Router = express.Router();

Router.post("/createUser", createUser);
Router.post("/authenticateUser", authenticateUser);

module.exports = Router;
