import Admin from "../models/Admin.js"; // <-- Tambah .js
import jwt from "jsonwebtoken";

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// @desc    Login Admin
// @route   POST /api/auth/login
// @access  Public
export const loginAdmin = async (req, res, next) => { // <-- Tambah 'export'
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username dan password wajib diisi" });
    }

    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ message: "Username salah" });
    }

    const isMatch = await admin.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Password salah" });
    }

    res.json({
      token: generateToken(admin._id),
      user: {
        _id: admin._id,
        username: admin.username,
      },
    });
  } catch (err) {
    next(err);
  }
};