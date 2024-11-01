const express = require("express");
const router = express.Router();
const path = require("path");

const { authenticateUser } = require("../middlewares/authentication");

router.use(express.static(path.join(__dirname, "../public")));

router.get("/", authenticateUser, (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "pages/chat.html"));
});

router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "pages/login.html"));
});

router.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "pages/register.html"));
});

module.exports = router;
