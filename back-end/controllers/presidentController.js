import President from "../models/presidentModel.js";
import cloudinary from "../config/cloudinary.js";

export const getPresident = async (req, res) => {
  try {
    const data = await President.findOne();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching president data", error });
  }
};

export const updatePresident = async (req, res) => {
  try {
    let p = await President.findOne();

    // Create empty structure if nothing exists
    if (!p) {
      p = new President({
        head: { name: {}, description1: {}, description2: {}, description3: {} },
        bishop: { name: {}, description1: {}, description2: {}, description3: {} },
        parishPriest: { name: {}, description1: {}, description2: {}, description3: {} }
      });
    }

    // Ensure nested objects exist (prevents 500 errors)
    const ensureSection = (section) => {
      p[section] = p[section] || {};
      p[section].name = p[section].name || {};
      p[section].description1 = p[section].description1 || {};
      p[section].description2 = p[section].description2 || {};
      p[section].description3 = p[section].description3 || {};
    };

    const uploadImage = async (section, folder) => {
      const base64Image = req.body[section]?.image;
      if (!base64Image) return;

      // delete old image
      if (p[section].cloudinaryId) {
        await cloudinary.uploader.destroy(p[section].cloudinaryId);
      }

      // Upload to Cloudinary
      const upload = await cloudinary.uploader.upload(base64Image, {
        folder,
      });

      p[section].imageUrl = upload.secure_url;
      p[section].cloudinaryId = upload.public_id;
    };

    // -----------------------------
    // HEAD
    // -----------------------------
    if (req.body.head) {
      ensureSection("head");
      await uploadImage("head", "president/head");

      p.head.name.en = req.body.head.name.en;
      p.head.name.ta = req.body.head.name.ta;

      p.head.description1.en = req.body.head.description1.en;
      p.head.description1.ta = req.body.head.description1.ta;

      p.head.description2.en = req.body.head.description2.en;
      p.head.description2.ta = req.body.head.description2.ta;

      p.head.description3.en = req.body.head.description3.en;
      p.head.description3.ta = req.body.head.description3.ta;
    }

    // -----------------------------
    // BISHOP
    // -----------------------------
    if (req.body.bishop) {
      ensureSection("bishop");
      await uploadImage("bishop", "president/bishop");

      p.bishop.name.en = req.body.bishop.name.en;
      p.bishop.name.ta = req.body.bishop.name.ta;

      p.bishop.description1.en = req.body.bishop.description1.en;
      p.bishop.description1.ta = req.body.bishop.description1.ta;

      p.bishop.description2.en = req.body.bishop.description2.en;
      p.bishop.description2.ta = req.body.bishop.description2.ta;

      p.bishop.description3.en = req.body.bishop.description3.en;
      p.bishop.description3.ta = req.body.bishop.description3.ta;
    }

    // -----------------------------
    // PARISH PRIEST
    // -----------------------------
    if (req.body.parishPriest) {
      ensureSection("parishPriest");
      await uploadImage("parishPriest", "president/parishPriest");

      p.parishPriest.name.en = req.body.parishPriest.name.en;
      p.parishPriest.name.ta = req.body.parishPriest.name.ta;

      p.parishPriest.description1.en = req.body.parishPriest.description1.en;
      p.parishPriest.description1.ta = req.body.parishPriest.description1.ta;

      p.parishPriest.description2.en = req.body.parishPriest.description2.en;
      p.parishPriest.description2.ta = req.body.parishPriest.description2.ta;

      p.parishPriest.description3.en = req.body.parishPriest.description3.en;
      p.parishPriest.description3.ta = req.body.parishPriest.description3.ta;
    }

    const saved = await p.save();
    res.status(200).json(saved);

  } catch (error) {
    console.error("❌ Error updating president:", error);
    res.status(500).json({ message: "Update failed", error });
  }
};
