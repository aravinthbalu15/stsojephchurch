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
    console.log("🔥 Received Body:", JSON.stringify(req.body, null, 2));

    let p = await President.findOne();
    if (!p) p = new President();

    const uploadImage = async (section, folder) => {
      const image = req.body[section]?.image;

      console.log(`📸 Upload check for: ${section}`, image ? "image found" : "no image");

      if (!image) return;

      if (p[section]?.cloudinaryId) {
        console.log(`🗑 Deleting old image: ${p[section].cloudinaryId}`);
        await cloudinary.uploader.destroy(p[section].cloudinaryId);
      }

      console.log("⬆️ Uploading new image for:", section);
      const upload = await cloudinary.uploader.upload(image, { folder });

      p[section].imageUrl = upload.secure_url;
      p[section].cloudinaryId = upload.public_id;
    };

    if (req.body.head) {
      await uploadImage("head", "president/head");

      p.head.name = req.body.head.name;
      p.head.description1 = req.body.head.description1;
      p.head.description2 = req.body.head.description2;
      p.head.description3 = req.body.head.description3;
    }

    if (req.body.bishop) {
      await uploadImage("bishop", "president/bishop");

      p.bishop.name = req.body.bishop.name;
      p.bishop.description1 = req.body.bishop.description1;
      p.bishop.description2 = req.body.bishop.description2;
      p.bishop.description3 = req.body.bishop.description3;
    }

    if (req.body.parishPriest) {
      await uploadImage("parishPriest", "president/parishPriest");

      p.parishPriest.name = req.body.parishPriest.name;
      p.parishPriest.description1 = req.body.parishPriest.description1;
      p.parishPriest.description2 = req.body.parishPriest.description2;
      p.parishPriest.description3 = req.body.parishPriest.description3;
    }

    console.log("💾 Saving to MongoDB...");
    const saved = await p.save();
    console.log("✅ Saved successfully");

    res.status(200).json(saved);

  } catch (error) {
    console.error("❌ BACKEND CRASH:", error);
    res.status(500).json({ message: "Update failed", error });
  }
};

