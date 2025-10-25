import Reservation from "../models/Reservation.js";

// GET semua reservasi (admin)
export const getReservations = async (req, res, next) => { 
  try {
    const reservations = await Reservation.find().sort({ createdAt: -1 });
    res.json(reservations);
  } catch (err) {
    next(err);
  }
};

// Get reservasi hari ini
export const getReservationsToday = async (req, res, next) => {
  try {
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const count = await Reservation.countDocuments({
      createdAt: { $gte: start, $lte: end }
    });

    res.json({ count });
  } catch (err) {
    next(err);
  }
};

export const getRecentReservations = async (req, res, next) => { 
  try {
    const reservations = await Reservation.find()
      .sort({ createdAt: -1 }) // urut dari terbaru
      .limit(5); // ambil 5 terbaru
    res.json(reservations);
  } catch (err) {
    next(err);
  }
};

// POST buat reservasi (user)
export const createReservation = async (req, res, next) => { 
  try {
    const { name, phone, date, people, note } = req.body;

    if (!name || !phone || !date || !people) {
      return res.status(400).json({ message: "Semua field wajib diisi!" });
    }

    const reservation = new Reservation({ name, phone, date, people, note });
    const saved = await reservation.save();
    res.status(201).json(saved);
  } catch (err)
 {
    next(err);
  }
};

// PUT update status (admin)
export const updateReservationStatus = async (req, res, next) => { 
  try {
    const { status } = req.body;
    if (!["pending", "confirmed", "cancelled"].includes(status)) {
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
export const deleteReservation = async (req, res, next) => { 
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