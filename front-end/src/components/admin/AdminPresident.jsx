import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./AdminPresident.css";

const API_URL = `${import.meta.env.VITE_API_URL}/api/president`;

const emptySection = () => ({
  name_en: "",
  name_ta: "",
  desc_en: "",
  desc_ta: "",
  desc1_en: "",
  desc1_ta: "",
  desc2_en: "",
  desc2_ta: "",
  desc3_en: "",
  desc3_ta: "",
  imageUrl: "",
  image: "",
});

const AdminPresident = () => {
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    head: emptySection(),
    bishop: emptySection(),
    parishPriest: emptySection(),
  });

  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const loadData = async () => {
    try {
      const res = await axios.get(API_URL);
      const p = res.data || {};

      const safe = (obj = {}) => ({
        name_en: obj?.name?.en || "",
        name_ta: obj?.name?.ta || "",
        desc_en: obj?.description?.en || "",
        desc_ta: obj?.description?.ta || "",
        desc1_en: obj?.description1?.en || "",
        desc1_ta: obj?.description1?.ta || "",
        desc2_en: obj?.description2?.en || "",
        desc2_ta: obj?.description2?.ta || "",
        desc3_en: obj?.description3?.en || "",
        desc3_ta: obj?.description3?.ta || "",
        imageUrl: obj?.imageUrl || "",
        image: "",
      });

      setData({
        head: safe(p.head),
        bishop: safe(p.bishop),
        parishPriest: safe(p.parishPriest),
      });
    } catch (error) {
      Swal.fire("Error", "Unable to load data", "error");
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

    const createBody = (s) => ({
      name: { en: data[s].name_en, ta: data[s].name_ta },
      description: { en: data[s].desc_en, ta: data[s].desc_ta },
      description1: { en: data[s].desc1_en, ta: data[s].desc1_ta },
      description2: { en: data[s].desc2_en, ta: data[s].desc2_ta },
      description3: { en: data[s].desc3_en, ta: data[s].desc3_ta },
      image: data[s].image || null,
    });

    const body = {
      head: createBody("head"),
      bishop: createBody("bishop"),
      parishPriest: createBody("parishPriest"),
    };

    try {
      await axios.put(API_URL, body);
      Swal.fire("Success", "Updated Successfully", "success");
      loadData();
    } catch (err) {
      Swal.fire("Error", "Update failed", "error");
    }

    setLoading(false);
  };

  return (
    <div className="container admin-presi">
      <h2 className="admin-title text-center mb-4">Admin — President Section</h2>

      {["head", "bishop", "parishPriest"].map((section) => (
        <div key={section} className="card shadow-lg p-4 mb-4">
          <h4 className="fw-bold text-capitalize">{section}</h4>

          {/* NAME EN / TA */}
          <input
            className="form-control mb-2"
            placeholder="Name (English)"
            value={data[section].name_en}
            onChange={(e) => handleInput(section, "name_en", e.target.value)}
          />
          <input
            className="form-control mb-2"
            placeholder="Name (Tamil)"
            value={data[section].name_ta}
            onChange={(e) => handleInput(section, "name_ta", e.target.value)}
          />

          {/* Description (head uses only desc, bishop & priest use desc1, desc2, desc3) */}
          <textarea
            className="form-control mb-2"
            placeholder="Description (EN)"
            value={data[section].desc_en}
            onChange={(e) => handleInput(section, "desc_en", e.target.value)}
          />
          <textarea
            className="form-control mb-2"
            placeholder="Description (TA)"
            value={data[section].desc_ta}
            onChange={(e) => handleInput(section, "desc_ta", e.target.value)}
          />

          {[1, 2, 3].map((num) => (
            <React.Fragment key={num}>
              <textarea
                className="form-control mb-2"
                placeholder={`Description${num} (EN)`}
                value={data[section][`desc${num}_en`]}
                onChange={(e) =>
                  handleInput(section, `desc${num}_en`, e.target.value)
                }
              />
              <textarea
                className="form-control mb-2"
                placeholder={`Description${num} (TA)`}
                value={data[section][`desc${num}_ta`]}
                onChange={(e) =>
                  handleInput(section, `desc${num}_ta`, e.target.value)
                }
              />
            </React.Fragment>
          ))}

          {/* IMAGE UPLOAD */}
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
