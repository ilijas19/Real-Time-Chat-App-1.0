const Token = require("../models/Token");
const CustomError = require("../errors");

const { verifyToken } = require("../utils");

const authorizePermission = (...roles) => {
  return (req, res, next) => {
    if (req.user.role === "admin") return next();
    if (roles.includes(req.user.role)) return next();
    throw new CustomError.UnauthorizedError("Not authorized to use this route");
  };
};

const authenticateUser = async (req, res, next) => {
  try {
    const { accessToken, refreshToken } = req.signedCookies;
    if (accessToken) {
      req.user = verifyToken(accessToken);
      // console.log(req.user);
      return next();
    }
    if (refreshToken) {
      const payload = verifyToken(refreshToken);
      const token = await Token.findOne({
        refreshToken: payload.refreshToken,
        user: payload.user.userId,
      });
      const { isValid } = token;

      if (isValid) {
        req.user = payload.user;
        return next();
      }
    }
    res.redirect("/login");
  } catch (error) {
    res.redirect("/login");
  }
};

module.exports = { authenticateUser, authorizePermission };
