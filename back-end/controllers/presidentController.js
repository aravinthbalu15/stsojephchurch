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
    let p = await President.findOne();
    if (!p) p = new President();

    // Ensure objects
    const ensure = (obj) => {
      if (!obj) obj = {};
      return {
        name: obj.name || { en: "", ta: "" },
        description: obj.description || { en: "", ta: "" },
        description1: obj.description1 || { en: "", ta: "" },
        description2: obj.description2 || { en: "", ta: "" },
        description3: obj.description3 || { en: "", ta: "" },
        imageUrl: obj.imageUrl || "",
        cloudinaryId: obj.cloudinaryId || "",
      };
    };

    p.head = ensure(p.head);
    p.bishop = ensure(p.bishop);
    p.parishPriest = ensure(p.parishPriest);

    // Upload helper
    const uploadImage = async (section, folder) => {
      const image = req.body[section]?.image;
      if (!image) return;

      const clean = image.replace(/^data:image\/\w+;base64,/, "");

      if (p[section].cloudinaryId) {
        await cloudinary.uploader.destroy(p[section].cloudinaryId);
      }

      const uploaded = await cloudinary.uploader.upload(
        `data:image/jpeg;base64,${clean}`,
        { folder }
      );

      p[section].imageUrl = uploaded.secure_url;
      p[section].cloudinaryId = uploaded.public_id;
    };

    // Update section
    const updateSection = async (section, folder) => {
      const body = req.body[section];
      if (!body) return;

      await uploadImage(section, folder);

      // Assign EN + TA fields
      for (const key of ["name", "description", "description1", "description2", "description3"]) {
        if (body[key]) {
          p[section][key].en = body[key].en || "";
          p[section][key].ta = body[key].ta || "";
        }
      }
    };

    await updateSection("head", "president/head");
    await updateSection("bishop", "president/bishop");
    await updateSection("parishPriest", "president/parishPriest");

    const saved = await p.save();
    res.status(200).json(saved);
  } catch (error) {
    console.log("❌ ERROR:", error);
    res.status(500).json({ message: "Update failed", error });
  }
};
