const User = require("../models/User");
const { BadRequestError, UnauthenticatedError } = require("../errors");
//import for status code
const { StatusCodes } = require("http-status-codes");
//import for hashing the password
// const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const register = async (req, res) => {
  // !! the code has been migrated to user.js in the models folder for a cleaner controller
  // const { name, email, password } = req.body;
  // generating random bytes to be added to hash, 10 bytes
  // const salt = await bcrypt.genSalt(10);
  // hashing the password with password and salt
  // const hashPassword = await bcrypt.hash(password, salt);
  // const tempUser = { name, email, password: hashPassword };
  //changed from ...tempUser to ...req.body because we're hashing the password using the pre middleware in mongoose
  //.create creates the user in json format
  const user = await User.create({ ...req.body });
  //creating jwt for user based on the instance method we wrote is User.js
  const token = user.createJWT();
  //sending back the name of the user as well as the token, we can also decode the token at the frontend
  // instead of using  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("please provide email and password");
  }
  const user = await User.findOne({ email });
  //compare password
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

module.exports = {
  register,
  login,
};
