import About from "../models/About.js";
import multer from "multer";
import path from "path";
import fs from "fs";

// --- Data Default ---
const DEFAULT_ABOUT_DATA = {
  title: "Cerita di Balik Dapur Kami",
  sub_title: "Lebih dari sekedar makanan, kami menyajikan sebuah pengalaman.",
  content_title: "Berawal dari Mimpi, Disajikan dengan Hati",
  description: "Naisham lahir dari kecintaan kami terhadap kekayaan kuliner Indonesia...",
  image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"
};

// --- Konfigurasi Multer untuk About Us ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "uploads/aboutUs/";
    // Buat folder jika belum ada
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Buat nama file unik
    cb(null, `about-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ext === ".jpg" || ext === ".jpeg" || ext === ".png") {
    cb(null, true);
  } else {
    cb(new Error("Hanya file gambar (jpg, jpeg, png) yang diizinkan!"), false);
  }
};

// Ekspor middleware multer
export const upload = multer({ storage, fileFilter });


// --- Logika Controller ---

// GET About
export const getAbout = async (req, res, next) => {
  try {
    let about = await About.findOne();
    if (!about) {
      console.log("Data 'About' tidak ditemukan, membuat data default...");
      about = new About(DEFAULT_ABOUT_DATA);
      await about.save();
    }
    res.status(200).json(about);
  } catch (error) {
    next(error);
  }
};

// UPDATE About
export const updateAbout = async (req, res, next) => {
  try {
    const about = await About.findOne() || new About(DEFAULT_ABOUT_DATA);

    if (req.file) {
      if (about.image && !about.image.startsWith('http') && fs.existsSync(about.image)) {
        fs.unlinkSync(about.image);
        console.log(`File lama dihapus: ${about.image}`);
      }
      about.image = req.file.path;
    }

    const { title, sub_title, content_title, description } = req.body;
    if (title !== undefined) about.title = title;
    if (sub_title !== undefined) about.sub_title = sub_title;
    if (content_title !== undefined) about.content_title = content_title;
    if (description !== undefined) about.description = description;

    const updated = await about.save();
    res.status(200).json(updated);

  } catch (error) {
    next(error);
  }
};

// RESET About
export const resetAbout = async (req, res, next) => {
  try {
    const about = await About.findOne();

    if (about && about.image && !about.image.startsWith('http') && fs.existsSync(about.image)) {
      fs.unlinkSync(about.image);
      console.log(`File lama dihapus saat reset: ${about.image}`);
    }

    const resetData = await About.findOneAndUpdate(
      {},
      DEFAULT_ABOUT_DATA,
      { new: true, upsert: true }
    );
    res.status(200).json(resetData);
  } catch (error) {
    next(error);
  }
};