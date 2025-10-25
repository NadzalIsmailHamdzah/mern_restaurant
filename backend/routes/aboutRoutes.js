import express from "express";
import {
  getAbout,
  updateAbout,
  resetAbout,
  upload
} from "../controllers/aboutController.js";
// import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// GET (Publik)
router.get("/", getAbout);

// UPDATE (Admin)
router.put("/", /* protect, */ upload.single("image"), updateAbout);

// RESET (Admin)
router.post("/reset", /* protect, */ resetAbout);

export default router;