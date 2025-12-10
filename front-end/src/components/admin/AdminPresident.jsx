import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./AdminPresident.css";

const API_URL = `${import.meta.env.VITE_API_URL}/api/president`;

const AdminPresident = () => {
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    head: {
      name_en: "",
      name_ta: "",
      desc1_en: "",
      desc1_ta: "",
      desc2_en: "",
      desc2_ta: "",
      desc3_en: "",
      desc3_ta: "",
      imageUrl: "",
      image: "",
    },

    bishop: {
      name_en: "",
      name_ta: "",
      desc_en: "",
      desc_ta: "",
      desc1_en: "",
      desc1_ta: "",
      desc2_en: "",
      desc2_ta: "",
      imageUrl: "",
      image: "",
    },

    parishPriest: {
      name_en: "",
      name_ta: "",
      desc1_en: "",
      desc1_ta: "",
      desc2_en: "",
      desc2_ta: "",
      desc3_en: "",
      desc3_ta: "",
      imageUrl: "",
      image: "",
    },
  });

  // Convert image to base64
  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const compressImage = (base64) =>
    new Promise((resolve) => {
      const img = new Image();
      img.src = base64;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width * 0.5;
        canvas.height = img.height * 0.5;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.6));
      };
    });

  // Load data
  const loadData = async () => {
    try {
      const res = await axios.get(API_URL);
      if (res.data) {
        const p = res.data;

        setData({
          head: {
            name_en: p.head.name?.en || "",
            name_ta: p.head.name?.ta || "",
            desc1_en: p.head.description1?.en || "",
            desc1_ta: p.head.description1?.ta || "",
            desc2_en: p.head.description2?.en || "",
            desc2_ta: p.head.description2?.ta || "",
            desc3_en: p.head.description3?.en || "",
            desc3_ta: p.head.description3?.ta || "",
            imageUrl: p.head.imageUrl || "",
            image: "",
          },

          bishop: {
            name_en: p.bishop.name?.en || "",
            name_ta: p.bishop.name?.ta || "",
            desc_en: p.bishop.description?.en || "",
            desc_ta: p.bishop.description?.ta || "",
            desc1_en: p.bishop.description1?.en || "",
            desc1_ta: p.bishop.description1?.ta || "",
            desc2_en: p.bishop.description2?.en || "",
            desc2_ta: p.bishop.description2?.ta || "",
            imageUrl: p.bishop.imageUrl || "",
            image: "",
          },

          parishPriest: {
            name_en: p.parishPriest.name?.en || "",
            name_ta: p.parishPriest.name?.ta || "",
            desc1_en: p.parishPriest.description1?.en || "",
            desc1_ta: p.parishPriest.description1?.ta || "",
            desc2_en: p.parishPriest.description2?.en || "",
            desc2_ta: p.parishPriest.description2?.ta || "",
            desc3_en: p.parishPriest.description3?.en || "",
            desc3_ta: p.parishPriest.description3?.ta || "",
            imageUrl: p.parishPriest.imageUrl || "",
            image: "",
          },
        });
      }
    } catch (error) {
      Swal.fire("Error", "Failed to load president data", "error");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleInput = (section, field, value) => {
    setData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  const handleImage = async (section, file) => {
    if (!file) return;
    const base64 = await fileToBase64(file);
    const compressed = await compressImage(base64);

    setData((prev) => ({
      ...prev,
      [section]: { ...prev[section], imageUrl: compressed, image: compressed },
    }));
  };

  // Save Data
  const saveData = async () => {
    setLoading(true);

    const requestBody = {
      head: {
        name: { en: data.head.name_en, ta: data.head.name_ta },
        description1: { en: data.head.desc1_en, ta: data.head.desc1_ta },
        description2: { en: data.head.desc2_en, ta: data.head.desc2_ta },
        description3: { en: data.head.desc3_en, ta: data.head.desc3_ta },
        image: data.head.image || null,
      },

      bishop: {
        name: { en: data.bishop.name_en, ta: data.bishop.name_ta },
        description: { en: data.bishop.desc_en, ta: data.bishop.desc_ta },
        description1: { en: data.bishop.desc1_en, ta: data.bishop.desc1_ta },
        description2: { en: data.bishop.desc2_en, ta: data.bishop.desc2_ta },
        image: data.bishop.image || null,
      },

      parishPriest: {
        name: { en: data.parishPriest.name_en, ta: data.parishPriest.name_ta },
        description1: { en: data.parishPriest.desc1_en, ta: data.parishPriest.desc1_ta },
        description2: { en: data.parishPriest.desc2_en, ta: data.parishPriest.desc2_ta },
        description3: { en: data.parishPriest.desc3_en, ta: data.parishPriest.desc3_ta },
        image: data.parishPriest.image || null,
      },
    };

    try {
      await axios.put(API_URL, requestBody);
      Swal.fire("Success", "Updated Successfully!", "success");
      loadData();
    } catch (error) {
      Swal.fire("Error", "Update Failed", "error");
    }

    setLoading(false);
  };

  return (
    <div className="container admin-presi">
      <h2 className="admin-title text-center mb-4">Admin — President Section (English + Tamil)</h2>

      {/* REPEATED CARD COMPONENTS */}
      {["head", "bishop", "parishPriest"].map((section) => (
        <div key={section} className="card shadow-lg p-4 mb-4">
          <h4 className="fw-bold text-capitalize">{section}</h4>

          {/* English + Tamil inputs */}
          {Object.keys(data[section])
            .filter((key) => key.startsWith("name") || key.startsWith("desc"))
            .map((field) => (
              <input
                key={field}
                className="form-control mb-2"
                value={data[section][field]}
                placeholder={field.replace("_", " ").toUpperCase()}
                onChange={(e) => handleInput(section, field, e.target.value)}
              />
            ))}

          {/* Image Upload */}
          <input
            type="file"
            className="form-control mb-2"
            accept="image/*"
            onChange={(e) => handleImage(section, e.target.files[0])}
          />
          {data[section].imageUrl && (
            <img src={data[section].imageUrl} className="preview-img" />
          )}
        </div>
      ))}

      <button className="btn btn-success w-100 mb-5" disabled={loading} onClick={saveData}>
        {loading ? "Updating..." : "Save All Changes"}
      </button>
    </div>
  );
};

export default AdminPresident;
