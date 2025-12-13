import ACMember from "../models/acModel.js";
import cloudinary from "../config/cloudinary.js";

/* ➕ CREATE MEMBER */
export const createMember = async (req, res) => {
  try {
    const { name_en, name_ta, description_en, description_ta } = req.body;

    if (!name_en || !name_ta || !description_en || !description_ta) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: "Image upload failed" });
    }

    const lastMember = await ACMember.findOne().sort({ order: -1 });
    const nextOrder = lastMember ? lastMember.order + 1 : 1;

    const result = await cloudinary.uploader.upload(req.file.path);

    const newMember = new ACMember({
      name: { en: name_en, ta: name_ta },
      description: { en: description_en, ta: description_ta },
      imageUrl: result.secure_url,
      cloudinaryId: result.public_id,
      order: nextOrder,
    });

    await newMember.save();
    res.status(201).json(newMember);
  } catch (error) {
    console.error("CREATE MEMBER ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* 📥 GET MEMBERS */
export const getMembers = async (req, res) => {
  try {
    const members = await ACMember.find().sort({ order: 1 });
    res.json(members);
  } catch (error) {
    console.error("GET MEMBERS ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ✏️ UPDATE MEMBER */
export const updateMember = async (req, res) => {
  try {
    const member = await ACMember.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    if (req.file && req.file.path) {
      await cloudinary.uploader.destroy(member.cloudinaryId);
      const result = await cloudinary.uploader.upload(req.file.path);
      member.imageUrl = result.secure_url;
      member.cloudinaryId = result.public_id;
    }

    const { name_en, name_ta, description_en, description_ta } = req.body;

    if (name_en) member.name.en = name_en;
    if (name_ta) member.name.ta = name_ta;
    if (description_en) member.description.en = description_en;
    if (description_ta) member.description.ta = description_ta;

    await member.save();
    res.json(member);
  } catch (error) {
    console.error("UPDATE MEMBER ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ❌ DELETE MEMBER */
export const deleteMember = async (req, res) => {
  try {
    const member = await ACMember.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    await cloudinary.uploader.destroy(member.cloudinaryId);
    await member.deleteOne();

    res.json({ message: "Member deleted successfully" });
  } catch (error) {
    console.error("DELETE MEMBER ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};
