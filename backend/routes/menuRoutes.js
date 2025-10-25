import express from "express";
import * as menuController from "../controllers/menuController.js";

const router = express.Router();

// Create menu dengan upload gambar
router.post("/", menuController.upload.single("image"), menuController.createMenu);

// Update menu
router.put("/:id", menuController.upload.single("image"), menuController.updateMenu);

// Read
router.get("/", menuController.getMenus);
router.get("/:id", menuController.getMenuById);

// Delete
router.delete("/:id", menuController.deleteMenu);

export default router;