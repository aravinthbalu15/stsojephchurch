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
    if (!p) p = new President();

    // Cloudinary Upload Helper
    const uploadImage = async (section, folder) => {
      const image = req.body[section]?.image;
      if (!image) return;

      if (p[section]?.cloudinaryId) {
        await cloudinary.uploader.destroy(p[section].cloudinaryId);
      }

      const upload = await cloudinary.uploader.upload(image, { folder });

      p[section].imageUrl = upload.secure_url;
      p[section].cloudinaryId = upload.public_id;
    };

    // ---------------------------
    // HEAD
    // ---------------------------
    if (req.body.head) {
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

    // ---------------------------
    // BISHOP
    // ---------------------------
   if (req.body.bishop) {
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


    // ---------------------------
    // PARISH PRIEST
    // ---------------------------
    if (req.body.parishPriest) {
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
    console.error("Error updating:", error);
    res.status(500).json({ message: "Update failed", error });
  }
};
