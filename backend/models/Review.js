import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    isActive: {type: Boolean, required: true},
  },
  { timestamps: true }
);

export default mongoose.model("Review", reviewSchema);