const express = require("express");
const router = express.Router();
const {
  getBanners,
  createBanner,
  updateBanner,
  deleteBanner,
} = require("../controllers/bannerController");
const protect = require("../middleware/authMiddleware");

//Public
router.get("/", getBanners);

// Admin only
router.post("/", protect, createBanner);
router.put("/:id", protect, updateBanner);
router.delete("/:id", protect, deleteBanner);

module.exports = router;
