import express from "express";
import {
  getReviews,
  getNewReviews,
  createReview,
  updateReview,
  deleteReview,
} from "../controllers/reviewController.js";
import protect from "../middleware/authMiddleware.js"; // <-- 1. Impor (pastikan path-nya benar)

const router = express.Router();

// Admin only
router.get("/", protect, getReviews); // <-- 2. Terapkan protect
router.get("/new", protect, getNewReviews);
router.post("/", protect, createReview);
router.put("/:id", protect, updateReview);
router.delete("/:id", protect, deleteReview);

export default router;