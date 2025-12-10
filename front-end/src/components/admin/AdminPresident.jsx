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
      desc1_en: "",
      desc1_ta: "",
      desc2_en: "",
      desc2_ta: "",
      desc3_en: "",
      desc3_ta: "",
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

  // Load data
  const loadData = async () => {
    try {
      const { data: p } = await axios.get(API_URL);

      setData({
        head: {
          name_en: p.head.name.en,
          name_ta: p.head.name.ta,
          desc1_en: p.head.description1.en,
          desc1_ta: p.head.description1.ta,
          desc2_en: p.head.description2.en,
          desc2_ta: p.head.description2.ta,
          desc3_en: p.head.description3.en,
          desc3_ta: p.head.description3.ta,
          imageUrl: p.head.imageUrl,
          image: "",
        },

        bishop: {
          name_en: p.bishop.name.en,
          name_ta: p.bishop.name.ta,
          desc1_en: p.bishop.description1.en,
          desc1_ta: p.bishop.description1.ta,
          desc2_en: p.bishop.description2.en,
          desc2_ta: p.bishop.description2.ta,
          desc3_en: p.bishop.description3.en,
          desc3_ta: p.bishop.description3.ta,
          imageUrl: p.bishop.imageUrl,
          image: "",
        },

        parishPriest: {
          name_en: p.parishPriest.name.en,
          name_ta: p.parishPriest.name.ta,
          desc1_en: p.parishPriest.description1.en,
          desc1_ta: p.parishPriest.description1.ta,
          desc2_en: p.parishPriest.description2.en,
          desc2_ta: p.parishPriest.description2.ta,
          desc3_en: p.parishPriest.description3.en,
          desc3_ta: p.parishPriest.description3.ta,
          imageUrl: p.parishPriest.imageUrl,
          image: "",
        },
      });
    } catch (error) {
      Swal.fire("Error", "Unable to load president data", "error");
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

    setData((prev) => ({
      ...prev,
      [section]: { ...prev[section], imageUrl: base64, image: base64 },
    }));
  };

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
        description1: { en: data.bishop.desc1_en, ta: data.bishop.desc1_ta },
        description2: { en: data.bishop.desc2_en, ta: data.bishop.desc2_ta },
        description3: { en: data.bishop.desc3_en, ta: data.bishop.desc3_ta },
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
      Swal.fire("Success", "President section updated!", "success");
      loadData();
    } catch (error) {
      Swal.fire("Error", "Update failed", "error");
    }

    setLoading(false);
  };

  return (
    <div className="container admin-presi">
      <h2 className="admin-title text-center mb-4">Admin — President Section</h2>

      {/* Repeated 3 sections */}
      {["head", "bishop", "parishPriest"].map((section) => (
        <div key={section} className="card shadow-lg p-4 mb-4">
          <h4 className="fw-bold text-capitalize">{section}</h4>

          {/* Name English/Tamil */}
          <input
            className="form-control mb-2"
            placeholder="Name (EN)"
            value={data[section].name_en}
            onChange={(e) => handleInput(section, "name_en", e.target.value)}
          />
          <input
            className="form-control mb-2"
            placeholder="Name (TA)"
            value={data[section].name_ta}
            onChange={(e) => handleInput(section, "name_ta", e.target.value)}
          />

          {/* Description1 */}
          <textarea
            className="form-control mb-2"
            placeholder="Description1 (EN)"
            value={data[section].desc1_en}
            onChange={(e) => handleInput(section, "desc1_en", e.target.value)}
          />
          <textarea
            className="form-control mb-2"
            placeholder="Description1 (TA)"
            value={data[section].desc1_ta}
            onChange={(e) => handleInput(section, "desc1_ta", e.target.value)}
          />

          {/* Description2 */}
          <textarea
            className="form-control mb-2"
            placeholder="Description2 (EN)"
            value={data[section].desc2_en}
            onChange={(e) => handleInput(section, "desc2_en", e.target.value)}
          />
          <textarea
            className="form-control mb-2"
            placeholder="Description2 (TA)"
            value={data[section].desc2_ta}
            onChange={(e) => handleInput(section, "desc2_ta", e.target.value)}
          />

          {/* Description3 */}
          <textarea
            className="form-control mb-2"
            placeholder="Description3 (EN)"
            value={data[section].desc3_en}
            onChange={(e) => handleInput(section, "desc3_en", e.target.value)}
          />
          <textarea
            className="form-control mb-2"
            placeholder="Description3 (TA)"
            value={data[section].desc3_ta}
            onChange={(e) => handleInput(section, "desc3_ta", e.target.value)}
          />

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

      <button
        className="btn btn-success w-100 mb-5"
        disabled={loading}
        onClick={saveData}
      >
        {loading ? "Updating..." : "Save All Changes"}
      </button>
    </div>
  );
};

export default AdminPresident;
