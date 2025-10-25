import fs from "fs";
import multer from "multer";
import Menu from "../models/Menu.js";

const mapMenu = (menu) => ({
  id: menu._id,
  name: menu.name,
  description: menu.description,
  price: menu.price,
  category: menu.category,
  image: menu.image,
});

// Konfigurasi multer 
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = "uploads/menu/";
    // Buat folder jika belum ada
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

// upload harus di-export agar bisa dipakai di route
export const upload = multer({ storage: storage });

// CREATE MENU
export const createMenu = async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ message: "Image is required" });

    // Ambil field sesuai model
    const { name, price, category, description } = req.body;
    // Validasi field sesuai model
    if (!name || !price || !category || !description) {
      return res.status(400).json({ message: "Name, price, category, and description are required" });
    }

    const newMenu = new Menu({
      image: req.file.path,
      name,
      price,
      category,
      description,
    });

    const savedMenu = await newMenu.save();
    res.status(201).json(mapMenu(savedMenu));
  } catch (err) {
    next(err);
  }
};

// GET ALL MENUS
export const getMenus = async (req, res, next) => {
  try {
    const menus = await Menu.find().sort({ createdAt: -1 });
    res.status(200).json(menus.map(mapMenu)); 
  } catch (err) {
    next(err);
  }
};

// GET SINGLE MENU
export const getMenuById = async (req, res, next) => {
  try {
    const menu = await Menu.findById(req.params.id);
    if (!menu) return res.status(404).json({ message: "Menu not found" });
    res.status(200).json(mapMenu(menu));
  } catch (err) {
    next(err); 
  }
};

// UPDATE MENU
export const updateMenu = async (req, res, next) => {
  try {
    const menu = await Menu.findById(req.params.id);
    if (!menu) return res.status(404).json({ message: "Menu not found" });

    // remove old image if new one uploaded
    if (req.file && menu.image) {
      if (fs.existsSync(menu.image)) fs.unlinkSync(menu.image); 
      menu.image = req.file.path;
    }

    // Ambil field sesuai model
    const { name, price, category, description } = req.body;
    if (name !== undefined) menu.name = name;
    if (price !== undefined) menu.price = price;
    if (category !== undefined) menu.category = category;
    if (description !== undefined) menu.description = description;

    const updatedMenu = await menu.save();
    res.status(200).json(mapMenu(updatedMenu));
  } catch (err) {
    next(err);
  }
};

// DELETE MENU
export const deleteMenu = async (req, res, next) => {
  try {
    const menu = await Menu.findById(req.params.id);
    if (!menu) return res.status(404).json({ message: "Menu not found" });

    // Hapus gambar terkait
    if (menu.image && fs.existsSync(menu.image)) {
      fs.unlinkSync(menu.image);
    }

    await menu.deleteOne();
    res.status(200).json({ message: "Menu deleted successfully" });
  } catch (err) {
    next(err);
  }
};