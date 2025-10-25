import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js"; // <-- Tambah .js
import errorHandler from "./middleware/errorHandler.js"; // <-- Tambah .js

// Import semua rute di atas
import menuRoutes from "./routes/menuRoutes.js";
import aboutRoutes from "./routes/aboutRoutes.js";
import reservationRoutes from "./routes/reservationRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import bannerRoutes from "./routes/bannerRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Gunakan variabel rute yang sudah di-import
app.use("/api/menu", menuRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/banners", bannerRoutes);
app.use("/api/auth", authRoutes);

// Error handler HARUS didefinisikan setelah semua rute
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));