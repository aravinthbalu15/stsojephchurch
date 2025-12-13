import Parish from "../models/parishModel.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

/* ================= CREATE ================= */
export const createParishMember = async (req, res) => {
  try {
    const {
      category,
      name_en,
      name_ta,
      description_en,
      description_ta,
    } = req.body;

    if (
      !category ||
      !name_en ||
      !name_ta ||
      !description_en ||
      !description_ta ||
      !req.file
    ) {
      return res.status(400).json({ message: "All fields required" });
    }

    // ✅ ORDER PER CATEGORY
    const last = await Parish.findOne({ category }).sort({ order: -1 });
    const nextOrder = last ? last.order + 1 : 1;

    // ✅ CLOUDINARY UPLOAD
    const uploaded = await cloudinary.uploader.upload(req.file.path, {
      folder: "parish_members",
    });

    const member = await Parish.create({
      category,
      name: { en: name_en, ta: name_ta },
      description: { en: description_en, ta: description_ta },
      imageUrl: uploaded.secure_url,
      cloudinaryId: uploaded.public_id,
      order: nextOrder,
    });

    // ✅ SAFE FILE CLEANUP (NO CRASH)
    if (req.file?.path) {
      try {
        fs.unlinkSync(req.file.path);
      } catch {
        console.warn("Temp file already removed");
      }
    }

    res.status(201).json(member);
  } catch (err) {
    console.error("CREATE ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= GET (ORDERED) ================= */
export const getParishMembers = async (req, res) => {
  try {
    const members = await Parish.find().sort({
      category: 1,
      order: 1,
    });
    res.json(members);
  } catch (err) {
    console.error("GET ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= UPDATE ================= */
export const updateParishMember = async (req, res) => {
  try {
    const member = await Parish.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: "Not found" });
    }

    const {
      category,
      name_en,
      name_ta,
      description_en,
      description_ta,
    } = req.body;

    // ⚠️ CATEGORY CHANGE → RECALCULATE ORDER
    if (category && category !== member.category) {
      const last = await Parish.findOne({ category }).sort({ order: -1 });
      member.order = last ? last.order + 1 : 1;
      member.category = category;
    }

    // ✅ UPDATE TEXT
    member.name.en = name_en;
    member.name.ta = name_ta;
    member.description.en = description_en;
    member.description.ta = description_ta;

    // ✅ IMAGE UPDATE (OPTIONAL)
    if (req.file) {
      if (member.cloudinaryId) {
        await cloudinary.uploader.destroy(member.cloudinaryId);
      }

      const uploaded = await cloudinary.uploader.upload(req.file.path);
      member.imageUrl = uploaded.secure_url;
      member.cloudinaryId = uploaded.public_id;

      // SAFE CLEANUP
      try {
        fs.unlinkSync(req.file.path);
      } catch {
        console.warn("Temp file already removed");
      }
    }

    await member.save();
    res.json(member);
  } catch (err) {
    console.error("UPDATE ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= DELETE + ORDER FIX ================= */
export const deleteParishMember = async (req, res) => {
  try {
    const member = await Parish.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: "Not found" });
    }

    const { category, order, cloudinaryId } = member;

    // ✅ SAFE CLOUDINARY DELETE
    if (cloudinaryId) {
      await cloudinary.uploader.destroy(cloudinaryId);
    }

    await member.deleteOne();

    // 🔥 FIX ORDER GAP PER CATEGORY
    await Parish.updateMany(
      { category, order: { $gt: order } },
      { $inc: { order: -1 } }
    );

    res.json({ message: "Deleted & order fixed" });
  } catch (err) {
    console.error("DELETE ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};
