import Review from "../models/Review.js"; // <-- Ubah require, tambah .js

// GET semua review
export const getReviews = async (req, res, next) => { // <-- Tambah 'export'
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    next(err);
  }
};

// Ambil jumlah review baru (misalnya yang dibuat hari ini)
export const getNewReviews = async (req, res) => { // <-- Tambah 'export'
  try {
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const count = await Review.countDocuments({
      createdAt: { $gte: start, $lte: end }
    });

    res.json({ count });
  } catch (err) {
    next(err);
  }
};


// POST buat review (admin)
export const createReview = async (req, res, next) => {
  try {
    const { name, rating, comment, isActive } = req.body;
    if (!name || !rating || !comment) {
      return res.status(400).json({ message: "Nama, rating, dan komentar wajib diisi!" });
    }

    const review = new Review({
      name,
      rating,
      comment,
      isActive: isActive !== undefined ? isActive : true 
    });

    const saved = await review.save();
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
};
// PUT update review (admin)
export const updateReview = async (req, res, next) => { // <-- Tambah 'export'
  try {
    const updated = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(440).json({ message: "Review tidak ditemukan" }); // 404 lebih umum
    }
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

// DELETE review (admin)
export const deleteReview = async (req, res, next) => { // <-- Tambah 'export'
  try {
    const deleted = await Review.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Review tidak ditemukan" });
    }
    res.json({ message: "Review dihapus" });
  } catch (err) {
    next(err);
  }
};