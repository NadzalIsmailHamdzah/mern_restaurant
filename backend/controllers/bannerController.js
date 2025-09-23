const Banner = require("../models/Banner");

exports.getBanners = async (req, res, next) => {
  try {
    const banners = await Banner.find().sort({ createdAt: -1 });
    res.json(banners);
  } catch (err) {
    next(err);
  }
};

exports.createBanner = async (req, res, next) => {
  try {
    const { imageUrl, isActive } = req.body;
    if (!imageUrl) {
      return res.status(400).json({ message: "Image URL wajib diisi!" });
    }

    const banner = new Banner({ imageUrl, isActive });
    const saved = await banner.save();
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
};

exports.updateBanner = async (req, res, next) => {
  try {
    const updated = await Banner.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Banner tidak ditemukan" });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

exports.deleteBanner = async (req, res, next) => {
  try {
    const deleted = await Banner.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Banner tidak ditemukan" });
    res.json({ message: "Banner dihapus" });
  } catch (err) {
    next(err);
  }
};
