const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({
        errorMessage: "Not authorized,token failed",
      });
    }
  }

  if (!token) {
    res.status(401);
    console.log("Not authorized, no token");
  }
};

exports.admin = (req, res, next) => {
  if (req.user && req.user.role === 1) {
    next();
  } else {
    res.status(401).json({
      errorMessage: "Not authoried as an admin",
    });
  }
};
