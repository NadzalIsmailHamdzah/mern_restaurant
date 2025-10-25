import Banner from "../models/Banner.js";
import multer from "multer";
import path from "path";
import fs from "fs";

// --- Data Default ---
const DEFAULT_BANNER_DATA = {
  title: "Cita Rasa Nusantara, Sentuhan Dunia.",
  description: "Nikmati perpaduan kuliner otentik dalam suasana modern yang hangat dan tak terlupakan.",
  image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800"
};

// --- Konfigurasi Multer untuk Banner ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "uploads/banner/";
    // Buat folder jika belum ada
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Buat nama file unik
    cb(null, `banner-${Date.now()}${path.extname(file.originalname)}`);
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

// --- Helper untuk hapus file ---
const deleteFile = (filePath) => {
  if (filePath && !filePath.startsWith('http') && fs.existsSync(filePath)) {
    try {
      fs.unlinkSync(filePath);
      console.log(`File lama dihapus: ${filePath}`);
    } catch (err) {
      console.error(`Gagal menghapus file: ${filePath}`, err);
    }
  }
};

// GET Banner (Get-or-Create)
export const getBanner = async (req, res, next) => {
  try {
    let banner = await Banner.findOne(); // Cukup cari satu
    if (!banner) {
      console.log("Data 'Banner' tidak ditemukan, membuat data default...");
      banner = new Banner(DEFAULT_BANNER_DATA);
      await banner.save();
    }
    res.status(200).json(banner);
  } catch (error) {
    next(error);
  }
};

// UPDATE Banner
export const updateBanner = async (req, res, next) => {
  try {
    const banner = await Banner.findOne() || new Banner(DEFAULT_BANNER_DATA);

    // Cek apakah ada file baru
    if (req.file) {
      deleteFile(banner.image); // Hapus file lama (jika ada & lokal)
      banner.image = req.file.path; // Set path file baru
    }

    // Update data teks dari req.body
    const { title, description } = req.body;
    if (title !== undefined) banner.title = title;
    if (description !== undefined) banner.description = description;

    const updated = await banner.save();
    res.status(200).json(updated);

  } catch (error) {
    next(error);
  }
};

// RESET Banner ke Default
export const resetBanner = async (req, res, next) => {
  try {
    const banner = await Banner.findOne();
    deleteFile(banner?.image); // Hapus file lama (jika ada & lokal)

    // Cari dan ganti datanya dengan DEFAULT_BANNER_DATA
    const resetData = await Banner.findOneAndUpdate(
      {},
      DEFAULT_BANNER_DATA, // Ganti dengan data default
      { new: true, upsert: true }
    );
    res.status(200).json(resetData);
  } catch (error) {
    next(error);
  }
};