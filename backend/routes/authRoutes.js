const express = require("express");
const { loginAdmin } = require("../controllers/authController");

const router = express.Router();

// Login
router.post("/login", loginAdmin);

module.exports = router;
