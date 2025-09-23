const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  nama: { type: String, required: true },
  harga: { type: Number, required: true },
  kategori: { type: String, required: true },
  tersedia: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model("Menu", menuSchema);
