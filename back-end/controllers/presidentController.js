import President from "../models/presidentModel.js";
import cloudinary from "../config/cloudinary.js";

// =========================
// GET PRESIDENT
// =========================
export const getPresident = async (req, res) => {
  try {
    const data = await President.findOne();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching president data", error });
  }
};

// =========================
// UPDATE PRESIDENT
// =========================
export const updatePresident = async (req, res) => {
  try {
    console.log("🔥 Received Body:", JSON.stringify(req.body, null, 2));

    // Fetch existing OR create new record
    let p = await President.findOne();
    if (!p) p = new President();

    // ------------------------------
    // Ensure correct nested structure
    // ------------------------------
    const ensureFields = (obj) => {
      if (!obj) obj = {};

      if (!obj.name) obj.name = { en: "", ta: "" };
      if (!obj.description1) obj.description1 = { en: "", ta: "" };
      if (!obj.description2) obj.description2 = { en: "", ta: "" };
      if (!obj.description3) obj.description3 = { en: "", ta: "" };
      if (!obj.imageUrl) obj.imageUrl = "";
      if (!obj.cloudinaryId) obj.cloudinaryId = "";

      return obj;
    };

    p.head = ensureFields(p.head);
    p.bishop = ensureFields(p.bishop);
    p.parishPriest = ensureFields(p.parishPriest);

    // ------------------------------
    // Cloudinary Upload Helper
    // ------------------------------
    const uploadImage = async (section, folder) => {
      const image = req.body[section]?.image;
      if (!image) return; // No new image uploaded

      // Remove Base64 prefix
      const cleanBase64 = image.replace(/^data:image\/\w+;base64,/, "");

      // Delete old Cloudinary image
      if (p[section].cloudinaryId) {
        await cloudinary.uploader.destroy(p[section].cloudinaryId);
      }

      // Upload new image
      const upload = await cloudinary.uploader.upload(
        `data:image/jpeg;base64,${cleanBase64}`,
        { folder }
      );

      p[section].imageUrl = upload.secure_url;
      p[section].cloudinaryId = upload.public_id;
    };

    // ------------------------------
    // Update Section Helper
    // ------------------------------
    const updateSection = async (sectionName, folder) => {
      const body = req.body[sectionName];
      if (!body) return;

      // Upload image if provided
      await uploadImage(sectionName, folder);

      // Write text values
      p[sectionName].name.en = body.name.en;
      p[sectionName].name.ta = body.name.ta;

      p[sectionName].description1.en = body.description1.en;
      p[sectionName].description1.ta = body.description1.ta;

      p[sectionName].description2.en = body.description2.en;
      p[sectionName].description2.ta = body.description2.ta;

      p[sectionName].description3.en = body.description3.en;
      p[sectionName].description3.ta = body.description3.ta;
    };

    // 🔥 Apply updates to all sections
    await updateSection("head", "president/head");
    await updateSection("bishop", "president/bishop");
    await updateSection("parishPriest", "president/parishPriest");

    // ------------------------------
    // SAVE FINAL RESULT
    // ------------------------------
    const saved = await p.save();
    console.log("✅ President data updated successfully");

    res.status(200).json(saved);

  } catch (error) {
    console.error("❌ BACKEND CRASH:", error);
    res.status(500).json({ message: "Update failed", error });
  }
};
