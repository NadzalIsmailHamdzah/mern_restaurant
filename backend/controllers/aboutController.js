import About from "../models/About.js";

// GET About Us (biasanya cuma 1 data)
export const getAbout = async (req, res, next) => {
  try {
    const about = await About.findOne(); // ambil dokumen pertama
    res.status(200).json(about);
  } catch (error) {
    next(error);
  }
};

// CREATE About Us (sekali aja dipakai, bisa juga di-skip kalau mau default)
export const createAbout = async (req, res, next) => {
  try {
    const about = new About(req.body);
    const saved = await about.save();
    res.status(201).json(saved);
  } catch (error) {
    next(error);
  }
};

// UPDATE About Us
export const updateAbout = async (req, res, next) => {
  try {
    const updated = await About.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};
