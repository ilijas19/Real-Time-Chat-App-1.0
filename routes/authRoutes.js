const express = require("express");
const router = express.Router();

const { authenticateUser } = require("../middlewares/authentication");

const {
  registerUser,
  loginUser,
  logout,
  showMe,
} = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.delete("/logout", authenticateUser, logout);
router.get("/showMe", authenticateUser, showMe);

module.exports = router;
