const express = require("express");
const {
  getMenus,
  createMenu,
  getMenuById,
  updateMenu,
  deleteMenu,
} = require("../controllers/menuController");

const router = express.Router();

router.get("/", getMenus);
router.post("/", createMenu);
router.get("/:id", getMenuById);
router.put("/:id", updateMenu);
router.delete("/:id", deleteMenu);

module.exports = router;
