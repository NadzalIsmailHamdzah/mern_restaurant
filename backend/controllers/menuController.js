import Menu from "../models/Menu.js";

// GET all menu
export const getMenus = async (req, res, next) => {
  try {
    const menus = await Menu.find();
    res.json(menus);
  } catch (err) {
    next(err);
  }
};

// POST create menu
export const createMenu = async (req, res, next) => {
  try {
    const { name, price, description } = req.body;

    if (!name || !price) {
      return res.status(400).json({ success: false, message: "Name & Price wajib diisi" });
    }

    if (isNaN(price)) {
      return res.status(400).json({ success: false, message: "Price harus berupa angka" });
    }

    const newMenu = new Menu({ name, price, description });
    const savedMenu = await newMenu.save();

    res.status(201).json({ success: true, data: savedMenu });
  } catch (err) {
    next(err);
  }
};
