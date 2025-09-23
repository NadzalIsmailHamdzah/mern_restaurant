import express from "express";
import { getAbout, createAbout, updateAbout } from "../controllers/aboutController.js";

const router = express.Router();

router.get("/", getAbout);
router.post("/", createAbout);
router.put("/:id", updateAbout);

export default router;
