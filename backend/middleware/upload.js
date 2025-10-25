import multer from "multer";
import path from "path";

// Tentukan storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // folder simpan gambar
  },
  filename: (req, file, cb) => {
    // kasih nama unik supaya nggak bentrok
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// Filter file (hanya image)
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ext === ".jpg" || ext === ".jpeg" || ext === ".png") {
    cb(null, true);
  } else {
    cb(new Error("Hanya menerima file gambar (jpg, jpeg, png)"));
  }
};

const upload = multer({ storage, fileFilter });

export default upload;