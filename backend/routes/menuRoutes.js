const express = require("express");
const router = express.Router();
const Menu = require("../models/Menu");

// GET all menu
router.get("/", async (req, res) => {
  try {
    const menus = await Menu.find();
    res.json(menus);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create menu
router.post("/", async (req, res) => {
  try {
    const { nama, harga, kategori } = req.body;
    if (!nama || !harga || !kategori) {
      return res.status(400).json({ message: "Nama, harga, dan kategori wajib diisi" });
    }
    if (isNaN(harga)) {
      return res.status(400).json({ message: "Harga harus berupa angka" });
    }

    const menu = new Menu({ nama, harga, kategori });
    const saved = await menu.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET by ID
router.get("/:id", async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id);
    if (!menu) return res.status(404).json({ message: "Menu tidak ditemukan" });
    res.json(menu);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT update
router.put("/:id", async (req, res) => {
  try {
    const updated = await Menu.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Menu tidak ditemukan" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Menu.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Menu tidak ditemukan" });
    res.json({ message: "Menu dihapus" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
