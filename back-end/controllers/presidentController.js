import President from "../models/presidentModel.js";
import cloudinary from "../config/cloudinary.js";

export const getPresident = async (req, res) => {
  try {
    const president = await President.findOne();
    res.status(200).json(president);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data", error });
  }
};

export const updatePresident = async (req, res) => {
  try {
    let president = await President.findOne();
    if (!president) {
      president = new President();
    }

    // HEAD UPDATE
    if (req.body.head) {
      if (req.body.head.image) {
        if (president.head.cloudinaryId) {
          await cloudinary.uploader.destroy(president.head.cloudinaryId);
        }

        const upload = await cloudinary.uploader.upload(req.body.head.image, {
          folder: "president/head",
        });

        president.head.imageUrl = upload.secure_url;
        president.head.cloudinaryId = upload.public_id;
      }

      president.head.name = req.body.head.name;
      president.head.description = req.body.head.description;
    }

    // BISHOP UPDATE
    if (req.body.bishop) {
      if (req.body.bishop.image) {
        if (president.bishop.cloudinaryId) {
          await cloudinary.uploader.destroy(president.bishop.cloudinaryId);
        }

        const upload = await cloudinary.uploader.upload(req.body.bishop.image, {
          folder: "president/bishop",
        });

        president.bishop.imageUrl = upload.secure_url;
        president.bishop.cloudinaryId = upload.public_id;
      }

      president.bishop.name = req.body.bishop.name;
      president.bishop.description = req.body.bishop.description;
      president.bishop.description1 = req.body.bishop.description1;
      president.bishop.description2 = req.body.bishop.description2;
    }

    // PARISH PRIEST UPDATE
    if (req.body.parishPriest) {
      if (req.body.parishPriest.image) {
        if (president.parishPriest.cloudinaryId) {
          await cloudinary.uploader.destroy(president.parishPriest.cloudinaryId);
        }

        const upload = await cloudinary.uploader.upload(req.body.parishPriest.image, {
          folder: "president/parishPriest",
        });

        president.parishPriest.imageUrl = upload.secure_url;
        president.parishPriest.cloudinaryId = upload.public_id;
      }

      president.parishPriest.name = req.body.parishPriest.name;
      president.parishPriest.description1 = req.body.parishPriest.description1;
      president.parishPriest.description2 = req.body.parishPriest.description2;
      president.parishPriest.description3 = req.body.parishPriest.description3;
    }

    const updated = await president.save();
    res.status(200).json(updated);

  } catch (error) {
    console.error("Error updating:", error);
    res.status(500).json({ message: "Update failed", error });
  }
};
