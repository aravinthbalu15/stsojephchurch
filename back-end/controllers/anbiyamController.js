import Anbiyam from "../models/AnbiyamModel.js";
import cloudinary from "../config/cloudinary.js";

/* =========================================================
   HELPER : Upload image only if base64
   ========================================================= */
const uploadIfBase64 = async (imageString, folder = "anbiyam") => {
  if (!imageString) return { url: null, public_id: null };

  // Already an URL → don't upload again
  if (typeof imageString === "string" && !imageString.startsWith("data:")) {
    return { url: imageString, public_id: null };
  }

  const result = await cloudinary.uploader.upload(imageString, { folder });
  return { url: result.secure_url, public_id: result.public_id };
};

/* =========================================================
   GET : All Anbiyams
   ========================================================= */
export const getAllAnbiyams = async (req, res) => {
  try {
    const data = await Anbiyam.find().sort({ groupNumber: 1 });
    res.json(data);
  } catch (err) {
    console.error("Error fetching Anbiyams:", err);
    res.status(500).json({ message: "Error fetching data" });
  }
};

/* =========================================================
   POST : Create Anbiyam
   ========================================================= */
export const createAnbiyam = async (req, res) => {
  try {
    const {
      groupNumber,
      groupTitle,        // { en, ta }
      mainTitle,         // { en, ta }
      mainDescription,   // { en, ta }
      mainImage,         // base64 or URL
      members = [],      // [{ name, role, description, image }]
    } = req.body;

    // Upload main image
    const mainImg = await uploadIfBase64(mainImage);

    // Members
    const processedMembers = [];
    for (const m of members) {
      const uploaded = await uploadIfBase64(m.image);
      processedMembers.push({
        name: m.name,                     // { en, ta }
        role: m.role,                     // { en, ta }
        description: m.description,       // { en, ta }
        imageUrl: uploaded.url || m.imageUrl || "",
        cloudinaryId: uploaded.public_id || m.cloudinaryId || "",
      });
    }

    const newDoc = new Anbiyam({
      groupNumber,
      groupTitle,
      mainTitle,
      mainDescription,
      mainImageUrl: mainImg.url || "",
      mainCloudinaryId: mainImg.public_id || "",
      members: processedMembers,
    });

    await newDoc.save();
    res.status(201).json(newDoc);
  } catch (err) {
    console.error("Create Anbiyam error:", err);
    res.status(400).json({ message: "Create failed" });
  }
};

/* =========================================================
   PUT : Update Anbiyam
   ========================================================= */
export const updateAnbiyam = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      groupNumber,
      groupTitle,
      mainTitle,
      mainDescription,
      mainImage,
      members = [],
    } = req.body;

    const existing = await Anbiyam.findById(id);
    if (!existing) {
      return res.status(404).json({ message: "Anbiyam not found" });
    }

    /* ---------- MAIN IMAGE ---------- */
    let mainImageUrl = existing.mainImageUrl;
    let mainCloudinaryId = existing.mainCloudinaryId;

    if (mainImage && mainImage.startsWith("data:")) {
      if (mainCloudinaryId) {
        await cloudinary.uploader.destroy(mainCloudinaryId);
      }
      const uploaded = await uploadIfBase64(mainImage);
      mainImageUrl = uploaded.url;
      mainCloudinaryId = uploaded.public_id;
    } else if (mainImage) {
      mainImageUrl = mainImage;
    }

    /* ---------- MEMBERS ---------- */
    const processedMembers = [];
    for (const m of members) {
      let imageUrl = m.imageUrl || "";
      let cloudinaryId = m.cloudinaryId || "";

      if (m.image && m.image.startsWith("data:")) {
        if (cloudinaryId) {
          await cloudinary.uploader.destroy(cloudinaryId);
        }
        const uploaded = await uploadIfBase64(m.image);
        imageUrl = uploaded.url;
        cloudinaryId = uploaded.public_id;
      } else if (m.image) {
        imageUrl = m.image;
      }

      processedMembers.push({
        _id: m._id,
        name: m.name,
        role: m.role,
        description: m.description,
        imageUrl,
        cloudinaryId,
      });
    }

    /* ---------- UPDATE ---------- */
    existing.groupNumber = groupNumber;
    existing.groupTitle = groupTitle;
    existing.mainTitle = mainTitle;
    existing.mainDescription = mainDescription;
    existing.mainImageUrl = mainImageUrl;
    existing.mainCloudinaryId = mainCloudinaryId;
    existing.members = processedMembers;

    const saved = await existing.save();
    res.json(saved);
  } catch (err) {
    console.error("Update Anbiyam error:", err);
    res.status(400).json({ message: "Update failed" });
  }
};

/* =========================================================
   DELETE : Anbiyam + Images
   ========================================================= */
export const deleteAnbiyam = async (req, res) => {
  try {
    const record = await Anbiyam.findById(req.params.id);
    if (!record) {
      return res.status(404).json({ message: "Not found" });
    }

    if (record.mainCloudinaryId) {
      await cloudinary.uploader.destroy(record.mainCloudinaryId);
    }

    for (const m of record.members) {
      if (m.cloudinaryId) {
        await cloudinary.uploader.destroy(m.cloudinaryId);
      }
    }

    await Anbiyam.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error("Delete Anbiyam error:", err);
    res.status(500).json({ message: "Delete failed" });
  }
};
