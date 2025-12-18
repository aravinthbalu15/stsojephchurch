import President from "../models/presidentModel.js";
import cloudinary from "../config/cloudinary.js";

/* ---------------- HELPERS ---------------- */

const emptySection = () => ({
  name: { en: "", ta: "" },
  description1: { en: "", ta: "" },
  description2: { en: "", ta: "" },
  description3: { en: "", ta: "" },
  image: "",
});

const uploadImage = async (base64, folder) => {
  const res = await cloudinary.uploader.upload(base64, { folder });
  return res.secure_url;
};

const deleteImage = async (url) => {
  if (!url) return;
  const publicId = url.split("/").slice(-1)[0].split(".")[0];
  await cloudinary.uploader.destroy(`president/${publicId}`);
};

/* ---------------- GET ---------------- */
export const getPresident = async (req, res) => {
  let data = await President.findOne();
  if (!data) {
    data = await President.create({
      head: emptySection(),
      bishop: emptySection(),
      parishPriest: emptySection(),
    });
  }
  res.json(data);
};

/* ---------------- PUT (UPDATE ONLY CHANGED) ---------------- */
export const updatePresident = async (req, res) => {
  try {
    let p = await President.findOne();
    if (!p) {
      p = new President({
        head: emptySection(),
        bishop: emptySection(),
        parishPriest: emptySection(),
      });
    }

    for (const section of ["head", "bishop", "parishPriest"]) {
      const incoming = req.body[section];
      if (!incoming) continue;

      // TEXT FIELDS
      ["name", "description1", "description2", "description3"].forEach((f) => {
        if (incoming[f]) {
          if (incoming[f].en !== p[section][f].en)
            p[section][f].en = incoming[f].en;

          if (incoming[f].ta !== p[section][f].ta)
            p[section][f].ta = incoming[f].ta;
        }
      });

      // IMAGE
      if (incoming.image?.startsWith("data:image")) {
        if (p[section].image) await deleteImage(p[section].image);
        p[section].image = await uploadImage(
          incoming.image,
          `president/${section}`
        );
      }
    }

    await p.save();
    res.json(p);
  } catch (e) {
    res.status(500).json({ message: "Update failed", error: e.message });
  }
};

/* ---------------- DELETE SECTION ---------------- */
export const deleteSection = async (req, res) => {
  const { section } = req.params;
  const p = await President.findOne();
  if (!p) return res.status(404).json({ message: "No data" });

  await deleteImage(p[section].image);
  p[section] = emptySection();

  await p.save();
  res.json({ message: `${section} deleted` });
};
