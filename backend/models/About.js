import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    sub_title: {
      type: String,
      required: [true, "Title is required"],
    },
    content_title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    image: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const About = mongoose.model("About", aboutSchema);
export default About;