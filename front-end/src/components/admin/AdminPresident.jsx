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
      desc_en: "",
      desc_ta: "",
      imageUrl: "",
      image: ""
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
      image: ""
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
      image: ""
    }
  });

  // Convert file to compressed base64
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

  const loadData = async () => {
    try {
      const res = await axios.get(API_URL);
      if (res.data) {
        const p = res.data;

        setData({
          head: {
            name_en: p.head.name?.en || "",
            name_ta: p.head.name?.ta || "",
            desc_en: p.head.description?.en || "",
            desc_ta: p.head.description?.ta || "",
            imageUrl: p.head.imageUrl || "",
            image: ""
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
            image: ""
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
            image: ""
          }
        });
      }
    } catch (err) {
      Swal.fire("Error", "Failed to load data", "error");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleInput = (section, field, value) => {
    setData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value }
    }));
  };

  const handleImage = async (section, file) => {
    if (!file) return;
    const base64 = await fileToBase64(file);
    const compressed = await compressImage(base64);

    setData((prev) => ({
      ...prev,
      [section]: { ...prev[section], imageUrl: compressed, image: compressed }
    }));
  };

  const saveData = async () => {
    setLoading(true);

    const requestBody = {
      head: {
        name: { en: data.head.name_en, ta: data.head.name_ta },
        description: { en: data.head.desc_en, ta: data.head.desc_ta },
        image: data.head.image || null
      },

      bishop: {
        name: { en: data.bishop.name_en, ta: data.bishop.name_ta },
        description: { en: data.bishop.desc_en, ta: data.bishop.desc_ta },
        description1: { en: data.bishop.desc1_en, ta: data.bishop.desc1_ta },
        description2: { en: data.bishop.desc2_en, ta: data.bishop.desc2_ta },
        image: data.bishop.image || null
      },

      parishPriest: {
        name: { en: data.parishPriest.name_en, ta: data.parishPriest.name_ta },
        description1: { en: data.parishPriest.desc1_en, ta: data.parishPriest.desc1_ta },
        description2: { en: data.parishPriest.desc2_en, ta: data.parishPriest.desc2_ta },
        description3: { en: data.parishPriest.desc3_en, ta: data.parishPriest.desc3_ta },
        image: data.parishPriest.image || null
      }
    };

    try {
      await axios.put(API_URL, requestBody);
      Swal.fire("Success!", "Updated Successfully", "success");
      loadData();
    } catch (err) {
      Swal.fire("Error!", "Update failed", "error");
    }

    setLoading(false);
  };

  // -------------------- UI ----------------------
  return (
    <div className="container admin-presi">
      <h2 className="admin-title text-center mb-4">Admin — President Section (EN + TA)</h2>

      {/* HEAD */}
      <div className="card shadow-lg p-4 mb-4">
        <h4 className="fw-bold">Head</h4>

        <input className="form-control mb-2" value={data.head.name_en} placeholder="Name (English)" onChange={(e) => handleInput("head", "name_en", e.target.value)} />
        <input className="form-control mb-2" value={data.head.name_ta} placeholder="Name (Tamil)" onChange={(e) => handleInput("head", "name_ta", e.target.value)} />

        <textarea className="form-control mb-2" value={data.head.desc_en} placeholder="Description (English)" onChange={(e) => handleInput("head", "desc_en", e.target.value)} />
        <textarea className="form-control mb-2" value={data.head.desc_ta} placeholder="Description (Tamil)" onChange={(e) => handleInput("head", "desc_ta", e.target.value)} />

        <input type="file" className="form-control mb-2" accept="image/*" onChange={(e) => handleImage("head", e.target.files[0])} />
        {data.head.imageUrl && <img src={data.head.imageUrl} className="preview-img" />}
      </div>

      {/* BISHOP */}
      <div className="card shadow-lg p-4 mb-4">
        <h4 className="fw-bold">Bishop</h4>

        <input className="form-control mb-2" value={data.bishop.name_en} placeholder="Name (English)" onChange={(e) => handleInput("bishop", "name_en", e.target.value)} />
        <input className="form-control mb-2" value={data.bishop.name_ta} placeholder="Name (Tamil)" onChange={(e) => handleInput("bishop", "name_ta", e.target.value)} />

        <textarea className="form-control mb-2" value={data.bishop.desc_en} placeholder="Description (EN)" onChange={(e) => handleInput("bishop", "desc_en", e.target.value)} />
        <textarea className="form-control mb-2" value={data.bishop.desc_ta} placeholder="Description (TA)" onChange={(e) => handleInput("bishop", "desc_ta", e.target.value)} />

        <textarea className="form-control mb-2" value={data.bishop.desc1_en} placeholder="Description1 (EN)" onChange={(e) => handleInput("bishop", "desc1_en", e.target.value)} />
        <textarea className="form-control mb-2" value={data.bishop.desc1_ta} placeholder="Description1 (TA)" onChange={(e) => handleInput("bishop", "desc1_ta", e.target.value)} />

        <textarea className="form-control mb-2" value={data.bishop.desc2_en} placeholder="Description2 (EN)" onChange={(e) => handleInput("bishop", "desc2_en", e.target.value)} />
        <textarea className="form-control mb-2" value={data.bishop.desc2_ta} placeholder="Description2 (TA)" onChange={(e) => handleInput("bishop", "desc2_ta", e.target.value)} />

        <input type="file" className="form-control mb-2" accept="image/*" onChange={(e) => handleImage("bishop", e.target.files[0])} />
        {data.bishop.imageUrl && <img src={data.bishop.imageUrl} className="preview-img" />}
      </div>

      {/* PARISH PRIEST */}
      <div className="card shadow-lg p-4 mb-4">
        <h4 className="fw-bold">Parish Priest</h4>

        <input className="form-control mb-2" value={data.parishPriest.name_en} placeholder="Name (EN)" onChange={(e) => handleInput("parishPriest", "name_en", e.target.value)} />
        <input className="form-control mb-2" value={data.parishPriest.name_ta} placeholder="Name (TA)" onChange={(e) => handleInput("parishPriest", "name_ta", e.target.value)} />

        <textarea className="form-control mb-2" value={data.parishPriest.desc1_en} placeholder="Description1 (EN)" onChange={(e) => handleInput("parishPriest", "desc1_en", e.target.value)} />
        <textarea className="form-control mb-2" value={data.parishPriest.desc1_ta} placeholder="Description1 (TA)" onChange={(e) => handleInput("parishPriest", "desc1_ta", e.target.value)} />

        <textarea className="form-control mb-2" value={data.parishPriest.desc2_en} placeholder="Description2 (EN)" onChange={(e) => handleInput("parishPriest", "desc2_en", e.target.value)} />
        <textarea className="form-control mb-2" value={data.parishPriest.desc2_ta} placeholder="Description2 (TA)" onChange={(e) => handleInput("parishPriest", "desc2_ta", e.target.value)} />

        <textarea className="form-control mb-2" value={data.parishPriest.desc3_en} placeholder="Description3 (EN)" onChange={(e) => handleInput("parishPriest", "desc3_en", e.target.value)} />
        <textarea className="form-control mb-2" value={data.parishPriest.desc3_ta} placeholder="Description3 (TA)" onChange={(e) => handleInput("parishPriest", "desc3_ta", e.target.value)} />

        <input type="file" className="form-control mb-2" accept="image/*" onChange={(e) => handleImage("parishPriest", e.target.files[0])} />
        {data.parishPriest.imageUrl && <img src={data.parishPriest.imageUrl} className="preview-img" />}
      </div>

      <button className="btn btn-success w-100 mb-5" disabled={loading} onClick={saveData}>
        {loading ? "Updating..." : "Save All Changes"}
      </button>
    </div>
  );
};

export default AdminPresident;
