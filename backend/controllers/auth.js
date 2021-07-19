const User = require("../models/User");
const bcrypt = require("bcryptjs");

const generateToken = require("../utils/token");

// @description Register new user
// @route POST / api/auth/register
// @acces Public
exports.registerController = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        errorMessage: "Email already exists",
      });
    }

    const newUser = new User();
    newUser.username = username;
    newUser.email = email;

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    const savedUser = await newUser.save();
    res.status(200).json({
      successMesssage: "Registration success.Please login.",
      savedUser,
    });
  } catch (error) {
    console.log("registerController error ", error);
    res.status(500).json({
      errorMessage: "Server error",
    });
  }
};

// @description Authenticate user & get token
// @route POST / api/auth/login
// @acces Public

exports.loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        //_id: user.id,
        // username: user.username,
        // email: user.email,
        // role: user.role,
        // avatar: user.avatar,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({
        errorMessage: "Invalid credentials",
      });
    }
  } catch (error) {
    console.log("Error in login controller", error);
    res.status(500).json({
      errorMessage: "Server error",
    });
  }
};
