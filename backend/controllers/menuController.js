const Menu = require("../models/Menu");

// GET semua menu
const getMenus = async (req, res, next) => {
  try {
    const menus = await Menu.find();
    res.json({ success: true, data: menus });
  } catch (err) {
    next(err); // dilempar ke error handler
  }
};

// POST tambah menu
const createMenu = async (req, res, next) => {
  try {
    const { nama, harga, deskripsi } = req.body;

    if (!nama || !harga) {
      const error = new Error("Nama dan harga wajib diisi");
      error.statusCode = 400;
      throw error;
    }

    if (isNaN(harga)) {
      const error = new Error("Harga harus berupa angka");
      error.statusCode = 400;
      throw error;
    }

    const menu = new Menu({ nama, harga, deskripsi });
    await menu.save();

    res.status(201).json({ success: true, data: menu });
  } catch (err) {
    next(err);
  }
};

module.exports = { getMenus, createMenu };
