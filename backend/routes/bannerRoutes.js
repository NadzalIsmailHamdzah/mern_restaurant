import express from "express";
import {
  getBanner,
  updateBanner,
  resetBanner,
  upload
} from "../controllers/bannerController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Get (Publik)
router.get("/", getBanner);

// Update (Admin)
router.put("/", protect, upload.single("image"), updateBanner);

// Reset (Admin)
router.post("/reset", protect, resetBanner);

export default router;