const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const User = require("./../models/user-model");

const createUser = async (req, res) => {
  const { username, password } = req.body;
  const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);
  const existingUser = await User.findOne({ username }).exec();
  if (existingUser) {
    return res.status(409).json({ message: "user already exists" });
  }
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  const user = new User({ username, password: hashedPassword });
  await user.save();
  return res.status(200).json({ message: "user created successfully" });
};

const authenticateUser = async (req, res) => {
  const { username, password } = req.body;
  const requiredUser = await User.findOne({ username });
  if (!requiredUser) {
    return res.status(401).json({ message: "User not found" });
  }
  const isValidUser = await bcrypt.compare(password, requiredUser.password);
  if (!isValidUser) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  var token = jwt.sign(
    { username, idd: requiredUser._id },
    process.env.JWT_SECRET
  );
  return res.status(200).json({ message: "User authenticated", token });
};

module.exports = { createUser, authenticateUser };
