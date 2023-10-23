const jwt = require("jsonwebtoken");
const User = require("./../models/user-model");
const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");
    const token = authHeader.split(" ")[1];
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      next(err);
    }
    req.user = await User.findById(decodedToken.id);
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authMiddleware;
