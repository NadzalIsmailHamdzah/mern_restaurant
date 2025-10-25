import express from "express";
import {
  getReservations,
  getReservationsToday,
  getRecentReservations,
  createReservation,
  updateReservationStatus,
  deleteReservation,
} from "../controllers/reservationController.js";
import protect from "../middleware/authMiddleware.js"; // <-- Ini sudah benar

const router = express.Router();

// --- Rute Publik (Contoh) ---
router.post("/", createReservation);
router.get("/recent", getRecentReservations);


// --- Rute Admin (Perlu 'protect') ---
router.get("/", protect, getReservations); // <-- TAMBAH protect
router.get("/today", protect, getReservationsToday); // <-- TAMBAH protect
router.put("/:id/status", protect, updateReservationStatus); // <-- TAMBAH protect
router.delete("/:id", protect, deleteReservation); // <-- TAMBAH protect

export default router;