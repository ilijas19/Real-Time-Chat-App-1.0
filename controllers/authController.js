const Token = require("../models/Token");
const User = require("../models/User");
const CustomError = require("../errors");
const crypto = require("crypto");
const { StatusCodes } = require("http-status-codes");

const { createTokenUser, attachCookiesToResponse } = require("../utils");

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    throw new CustomError.BadRequestError("All Credientials Must Be Provided");
  }
  await User.create({ username, email, password });
  res.status(StatusCodes.OK).json({ msg: "User Registered" });
};
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new CustomError.BadRequestError("all credientals must be specified");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError.NotFoundError("No user with specified Email");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError("Wrong password");
  }
  const { isVerified } = user;
  if (!isVerified) {
    throw new CustomError.UnauthenticatedError("User Not Verified");
  }
  const tokenUser = createTokenUser(user);
  //token exists
  const existingToken = await Token.findOne({ user: user._id });
  if (existingToken) {
    const refreshToken = existingToken.refreshToken;
    attachCookiesToResponse({ res, user: tokenUser, refreshToken });
    return res
      .status(StatusCodes.OK)
      .json({ msg: "login successfull", tokenUser });
  }
  //token doesent exists
  const ip = req.ip;
  const userAgent = req.headers["user-agent"];
  const refreshToken = crypto.randomBytes(40).toString("hex");
  const token = await Token.create({
    refreshToken,
    ip,
    userAgent,
    user: user._id,
  });
  attachCookiesToResponse({ res, user: tokenUser, refreshToken });
  res.status(StatusCodes.OK).json({ tokenUser });
};

const logout = async (req, res) => {
  await Token.findOneAndDelete({ user: req.user.userId });
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.status(StatusCodes.OK).json({ msg: "Logout" });
};
const showMe = async (req, res) => {
  res.status(StatusCodes.OK).json({ currentUser: req.user });
};
////////////////////////////////
const verifyEmail = async (req, res) => {
  res.send("register");
};
const forgotPassword = async (req, res) => {
  res.send("login");
};
const resetPassword = async (req, res) => {
  res.send("login");
};

module.exports = {
  registerUser,
  loginUser,
  logout,
  showMe,
};
