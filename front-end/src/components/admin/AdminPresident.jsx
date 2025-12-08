import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./AdminPresident.css";

const API_URL = `${import.meta.env.VITE_API_URL}/api/president`;  // ⭐ GLOBAL URL

const AdminPresident = () => {
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    head: { name: "", description: "", imageUrl: "", image: "" },
    bishop: {
      name: "",
      description: "",
      description1: "",
      description2: "",
      imageUrl: "",
      image: "",
    },
    parishPriest: {
      name: "",
      description1: "",
      description2: "",
      description3: "",
      imageUrl: "",
      image: "",
    },
  });

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
        setData({
          head: { ...res.data.head, image: "" },
          bishop: { ...res.data.bishop, image: "" },
          parishPriest: { ...res.data.parishPriest, image: "" },
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to load data", "error");
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
      [section]: { ...prev[section], image: compressed, imageUrl: compressed },
    }));
  };

  const saveData = async () => {
    setLoading(true);

    const requestBody = {
      head: {
        name: data.head.name,
        description: data.head.description,
        image: data.head.image || null,
      },
      bishop: {
        name: data.bishop.name,
        description: data.bishop.description,
        description1: data.bishop.description1,
        description2: data.bishop.description2,
        image: data.bishop.image || null,
      },
      parishPriest: {
        name: data.parishPriest.name,
        description1: data.parishPriest.description1,
        description2: data.parishPriest.description2,
        description3: data.parishPriest.description3,
        image: data.parishPriest.image || null,
      },
    };

    try {
      await axios.put(API_URL, requestBody);
      Swal.fire("Success!", "Updated Successfully", "success");
      loadData();
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", "Update failed", "error");
    }

    setLoading(false);
  };

  return (
    <div className="container admin-presi">
      <h2 className="admin-title text-center mb-4">Admin - Manage President Section</h2>

      {/* HEAD */}
      <div className="card shadow-lg p-4 mb-4">
        <h4 className="fw-bold">Head</h4>
        <input
          className="form-control mb-3"
          value={data.head.name}
          placeholder="Enter Name"
          onChange={(e) => handleInput("head", "name", e.target.value)}
        />
        <textarea
          className="form-control mb-3"
          value={data.head.description}
          placeholder="Enter Description"
          onChange={(e) => handleInput("head", "description", e.target.value)}
        />
        <input
          type="file"
          className="form-control mb-3"
          accept="image/*"
          onChange={(e) => handleImage("head", e.target.files[0])}
        />
        {data.head.imageUrl && <img src={data.head.imageUrl} className="preview-img" />}
      </div>

      {/* BISHOP */}
      <div className="card shadow-lg p-4 mb-4">
        <h4 className="fw-bold">Bishop</h4>
        <input
          className="form-control mb-3"
          value={data.bishop.name}
          placeholder="Enter Name"
          onChange={(e) => handleInput("bishop", "name", e.target.value)}
        />
        <textarea
          className="form-control mb-3"
          value={data.bishop.description}
          placeholder="Enter Description 1"
          onChange={(e) => handleInput("bishop", "description", e.target.value)}
        />
        <textarea
          className="form-control mb-3"
          value={data.bishop.description1}
          placeholder="Enter Description 2"
          onChange={(e) => handleInput("bishop", "description1", e.target.value)}
        />
        <textarea
          className="form-control mb-3"
          value={data.bishop.description2}
          placeholder="Enter Description 3"
          onChange={(e) => handleInput("bishop", "description2", e.target.value)}
        />
        <input
          type="file"
          className="form-control mb-3"
          accept="image/*"
          onChange={(e) => handleImage("bishop", e.target.files[0])}
        />
        {data.bishop.imageUrl && <img src={data.bishop.imageUrl} className="preview-img" />}
      </div>

      {/* PARISH PRIEST */}
      <div className="card shadow-lg p-4 mb-4">
        <h4 className="fw-bold">Parish Priest</h4>
        <input
          className="form-control mb-3"
          value={data.parishPriest.name}
          placeholder="Enter Name"
          onChange={(e) => handleInput("parishPriest", "name", e.target.value)}
        />
        <textarea
          className="form-control mb-3"
          value={data.parishPriest.description1}
          placeholder="Enter Description 1"
          onChange={(e) => handleInput("parishPriest", "description1", e.target.value)}
        />
        <textarea
          className="form-control mb-3"
          value={data.parishPriest.description2}
          placeholder="Enter Description 2"
          onChange={(e) => handleInput("parishPriest", "description2", e.target.value)}
        />
        <textarea
          className="form-control mb-3"
          value={data.parishPriest.description3}
          placeholder="Enter Description 3"
          onChange={(e) => handleInput("parishPriest", "description3", e.target.value)}
        />
        <input
          type="file"
          className="form-control mb-3"
          accept="image/*"
          onChange={(e) => handleImage("parishPriest", e.target.files[0])}
        />
        {data.parishPriest.imageUrl && (
          <img src={data.parishPriest.imageUrl} className="preview-img" />
        )}
      </div>

      <button className="btn btn-success w-100 mb-5" disabled={loading} onClick={saveData}>
        {loading ? "Updating..." : "Save All Changes"}
      </button>
    </div>
  );
};

export default AdminPresident;
