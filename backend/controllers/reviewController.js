const Review = require("../models/Review");

// GET semua review
exports.getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    next(err);
  }
};

// POST buat review (admin)
exports.createReview = async (req, res, next) => {
  try {
    const { name, rating, comment } = req.body;
    if (!name || !rating || !comment) {
      return res.status(400).json({ message: "Nama, rating, dan komentar wajib diisi!" });
    }

    const review = new Review({ name, rating, comment });
    const saved = await review.save();
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
};

// PUT update review (admin)
exports.updateReview = async (req, res, next) => {
  try {
    const updated = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ message: "Review tidak ditemukan" });
    }
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

// DELETE review (admin)
exports.deleteReview = async (req, res, next) => {
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
