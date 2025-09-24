const express = require("express");
const router = express.Router();
const {
  getReservations,
  createReservation,
  updateReservationStatus,
  deleteReservation,
} = require("../controllers/reservationController");
const protect = require("../middleware/authMiddleware");


router.get("/", getReservations);
router.post("/", protect, createReservation);
router.put("/:id/status", protect, updateReservationStatus);
router.delete("/:id", protect, deleteReservation);

module.exports = router;
