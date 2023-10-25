const jwt = require("jsonwebtoken");
const User = require("./../models/user-model");
const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");

    // Checking if Authorization is present
    if (!authHeader) {
      let error = new Error("Not authenticated");
      error.statusCode = 401;
      return next(error);
    }

    // Decoding the token
    const token = authHeader.split(" ")[1];
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return next(err);
    }

    if (!decodedToken.id) {
      let error = new Error("id is not found in the token");
      error.statusCode = 500;
      return next(error);
    }

    req.user = await User.findById(decodedToken.id);
    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = authMiddleware;
