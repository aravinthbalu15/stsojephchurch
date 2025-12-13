import HeartConventImage from "../models/HeartConventImage.js";
import cloudinary from "../config/cloudinary.js";

/* ================= CREATE ================= */
export const uploadImage = async (req, res) => {
  try {
    const {
      name_en,
      name_ta,
      description_en,
      description_ta,
    } = req.body;

    // ✅ STRICT VALIDATION
    if (
      !name_en ||
      !name_ta ||
      !description_en ||
      !description_ta
    ) {
      return res.status(400).json({
        message: "All text fields are required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Image is required",
      });
    }

    // ✅ ORDER
    const last = await HeartConventImage.findOne().sort({ order: -1 });
    const nextOrder = last ? last.order + 1 : 1;

    // ✅ CLOUDINARY
    const result = await cloudinary.uploader.upload(req.file.path);

    const image = await HeartConventImage.create({
      name: {
        en: name_en,
        ta: name_ta,
      },
      description: {
        en: description_en,
        ta: description_ta,
      },
      imageUrl: result.secure_url,
      cloudinaryId: result.public_id,
      order: nextOrder,
    });

    res.status(201).json(image);
  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    res.status(500).json({
      message: err.message || "Server error",
    });
  }
};


/* ================= GET (ORDERED) ================= */
export const getImages = async (req, res) => {
  try {
    const images = await HeartConventImage.find().sort({ order: 1 });
    res.json(images);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= UPDATE ================= */
export const updateImage = async (req, res) => {
  try {
    const image = await HeartConventImage.findById(req.params.id);
    if (!image) return res.status(404).json({ message: "Not found" });

    const {
      name_en,
      name_ta,
      description_en,
      description_ta,
    } = req.body;

    image.name.en = name_en;
    image.name.ta = name_ta;
    image.description.en = description_en;
    image.description.ta = description_ta;

    await image.save();
    res.json(image);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= DELETE ================= */
export const deleteImage = async (req, res) => {
  try {
    const image = await HeartConventImage.findById(req.params.id);
    if (!image) return res.status(404).json({ message: "Not found" });

    await cloudinary.uploader.destroy(image.cloudinaryId);
    await image.deleteOne();

    res.json({ message: "Deleted" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};
