const express = require("express");
const {
  getMenus,
  createMenu,
  getMenuById,
  updateMenu,
  deleteMenu,
} = require("../controllers/menuController");
const protect = require("../middleware/authMiddlleware");


const router = express.Router();

router.get("/", getMenus);
router.get("/:id", getMenuById);
router.post("/", protect, createMenu);
router.put("/:id", protect, updateMenu);
router.delete("/:id", protect, deleteMenu);

module.exports = router;
