const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const asyncHandler = require("express-async-handler");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("missing fields");
  }

  const existedEmail = await User.findOne({ email });

  if (existedEmail) {
    res.status(400);
    throw new Error("email is already taken");
  }

  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  res
    .status(200)
    .json({
      message: "User registered successfully",
      user,
      token: generateToken(user._id),
    });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (
    user &&
    (await bcrypt.compare(password.toString(), user.password.toString()))
  ) {
    res
      .status(200)
      .json({
        message: "You are logged in",
        id: user._id,
        name: user.name,
        token: await generateToken(user._id),
      });
  } else {
    res.status(400);
    throw new Error("invalid credantles");
  }
});

const generateToken = (userId) => {
  const expiresIn = "4d";
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn });
  return token;
};
module.exports = { registerUser, loginUser };
