const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const auth = async (req, res, next) => {
  //check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("Authentication invalid");
  }
  //split the string after the first space, and return rest of the string
  const token = authHeader.split(" ")[1];
  try {
    //alternate code
    //attach the user to the job routes
    //verify the token with the secret and returns the decoded object
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // const user = User.findById(payload.id).select("-password");
    // req.user =  user
    req.user = { userId: payload.userId, name: payload.name };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};
module.exports = auth;
