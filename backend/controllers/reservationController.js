const Reservation = require("../models/Reservation");

// GET semua reservasi (admin)
exports.getReservations = async (req, res, next) => {
  try {
    const reservations = await Reservation.find().sort({ createdAt: -1 });
    res.json(reservations);
  } catch (err) {
    next(err);
  }
};

// POST buat reservasi (user)
exports.createReservation = async (req, res, next) => {
  try {
    const { name, phone, date, people, note } = req.body;

    if (!name || !phone || !date || !people) {
      return res.status(400).json({ message: "Semua field wajib diisi!" });
    }

    const reservation = new Reservation({ name, phone, date, people, note });
    const saved = await reservation.save();
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
};

// PUT update status (admin)
exports.updateReservationStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!["pending", "confirmed", "canceled"].includes(status)) {
      return res.status(400).json({ message: "Status tidak valid" });
    }

    const updated = await Reservation.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Reservasi tidak ditemukan" });
    }

    res.json(updated);
  } catch (err) {
    next(err);
  }
};

// DELETE reservasi (admin)
exports.deleteReservation = async (req, res, next) => {
  try {
    const deleted = await Reservation.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Reservasi tidak ditemukan" });
    }

    res.json({ message: "Reservasi dihapus" });
  } catch (err) {
    next(err);
  }
};
