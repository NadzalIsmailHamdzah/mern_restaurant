import mongoose from "mongoose";

const menuSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
    },
    price: {
      type: String,
      required: [true, "Price is required"],
    },
    image: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);
export default mongoose.model("Menu", menuSchema);