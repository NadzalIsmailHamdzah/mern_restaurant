const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // nama customer
    rating: { type: Number, required: true, min: 1, max: 5 }, // bintang 1-5
    comment: { type: String, required: true }, // isi review
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
