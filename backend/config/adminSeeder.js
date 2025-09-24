const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Admin = require("../models/Admin");

dotenv.config();
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/restoran";

const seedAdmin = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected...");

    // cek apakah sudah ada admin
    const existing = await Admin.findOne({ username: "admin" });
    if (existing) {
      console.log("Admin sudah ada, skip seeding.");
      process.exit();
    }

    // bikin admin baru
    const admin = new Admin({
      username: "admin",
      password: "password123", // nanti otomatis ke-hash
    });

    await admin.save();
    console.log("Admin berhasil dibuat ✅");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedAdmin();
