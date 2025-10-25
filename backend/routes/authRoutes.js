// File 1: routes/authRoutes.js

import express from "express";
import { loginAdmin } from "../controllers/authController.js"; // <-- Tambah .js

const router = express.Router();

// Login
router.post("/login", loginAdmin);

export default router; // <-- Ubah export