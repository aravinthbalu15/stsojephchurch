import President from "../models/presidentModel.js";
import cloudinary from "../config/cloudinary.js";

// =======================================================
// Helper: Upload to Cloudinary
// =======================================================
const uploadImage = async (base64, folder) => {
  if (!base64) return null;

  const uploaded = await cloudinary.uploader.upload(base64, {
    folder,
  });

  return uploaded.secure_url;
};

// =======================================================
// CREATE PRESIDENT (POST)
// =======================================================
export const createPresident = async (req, res) => {
  try {
    const p = new President(req.body);
    const saved = await p.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: "Create failed", error });
  }
};

// =======================================================
// GET PRESIDENT (GET)
// =======================================================
export const getPresident = async (req, res) => {
  try {
    const data = await President.findOne();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data", error });
  }
};

// =======================================================
// UPDATE PRESIDENT (PUT)
// =======================================================
export const updatePresident = async (req, res) => {
  try {
    let p = await President.findOne();
    if (!p) p = new President(); // If empty create new doc

    // -------- Helper to update each section --------
    const updateSection = async (section, folder) => {
      const body = req.body[section];
      if (!body) return;

      // Update bilingual text fields
      ["name", "description1", "description2", "description3"].forEach((field) => {
        if (body[field]) {
          p[section][field].en = body[field].en || "";
          p[section][field].ta = body[field].ta || "";
        }
      });

      // Update image
      if (body.image) {
        const url = await uploadImage(body.image, folder);
        if (url) p[section].image = url;
      }
    };

    await updateSection("head", "president/head");
    await updateSection("bishop", "president/bishop");
    await updateSection("parishPriest", "president/parishPriest");

    const saved = await p.save();
    res.status(200).json(saved);

  } catch (error) {
    res.status(500).json({ message: "Update failed", error });
  }
};

// =======================================================
// DELETE ENTIRE PRESIDENT DOCUMENT
// =======================================================
export const deletePresident = async (req, res) => {
  try {
    await President.deleteMany({});
    res.status(200).json({ message: "All president data deleted" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed", error });
  }
};

// =======================================================
// DELETE ONE SECTION (head, bishop, parishPriest)
// =======================================================
export const deleteSection = async (req, res) => {
  try {
    const { section } = req.params;

    if (!["head", "bishop", "parishPriest"].includes(section)) {
      return res.status(400).json({ message: "Invalid section" });
    }

    let p = await President.findOne();
    if (!p) return res.status(404).json({ message: "No data found" });

    // Reset section fields
    p[section] = {
      name: { en: "", ta: "" },
      description1: { en: "", ta: "" },
      description2: { en: "", ta: "" },
      description3: { en: "", ta: "" },
      image: "",
    };

    const saved = await p.save();

    res.status(200).json({ message: `${section} deleted`, saved });

  } catch (error) {
    res.status(500).json({ message: "Delete section failed", error });
  }
};
