import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AdminHeartConvent.css";

const API_URL = import.meta.env.VITE_API_URL;

const AdminHeartConvent = () => {
  const [images, setImages] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [uploading, setUploading] = useState(false);

  // ✅ MATCH BACKEND STRUCTURE
  const [formData, setFormData] = useState({
    name_en: "",
    name_ta: "",
    description_en: "",
    description_ta: "",
    image: null,
  });

  const fileInputRef = useRef(null);

  /* ================= FETCH ================= */
  const fetchImages = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/heartconvent`);
      setImages(res.data); // already ordered from backend
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name_en ||
      !formData.name_ta ||
      !formData.description_en ||
      !formData.description_ta ||
      (!editingId && !formData.image)
    ) {
      Swal.fire("Error", "All fields are required", "error");
      return;
    }

    const ok = await Swal.fire({
      title: editingId ? "Update image?" : "Upload image?",
      icon: "question",
      showCancelButton: true,
    });

    if (!ok.isConfirmed) return;

    const data = new FormData();
    data.append("name_en", formData.name_en);
    data.append("name_ta", formData.name_ta);
    data.append("description_en", formData.description_en);
    data.append("description_ta", formData.description_ta);
    if (formData.image) data.append("image", formData.image);

    try {
      setUploading(true);

      if (editingId) {
        // ✏️ UPDATE (NO RESET)
        await axios.put(
          `${API_URL}/api/heartconvent/${editingId}`,
          data
        );
        Swal.fire("Updated", "Image updated successfully", "success");
      } else {
        // ➕ CREATE (RESET)
        await axios.post(`${API_URL}/api/heartconvent`, data);
        Swal.fire("Uploaded", "Image uploaded successfully", "success");

        setFormData({
          name_en: "",
          name_ta: "",
          description_en: "",
          description_ta: "",
          image: null,
        });

        if (fileInputRef.current) fileInputRef.current.value = "";
      }

      setEditingId(null);
      fetchImages();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Operation failed", "error");
    } finally {
      setUploading(false);
    }
  };

  /* ================= EDIT ================= */
  const handleEdit = (img) => {
    setEditingId(img._id);
    setFormData({
      name_en: img.name.en,
      name_ta: img.name.ta,
      description_en: img.description.en,
      description_ta: img.description.ta,
      image: null,
    });

    if (fileInputRef.current) fileInputRef.current.value = "";
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    const ok = await Swal.fire({
      title: "Delete this image?",
      icon: "warning",
      showCancelButton: true,
    });

    if (!ok.isConfirmed) return;

    try {
      await axios.delete(`${API_URL}/api/heartconvent/${id}`);
      Swal.fire("Deleted", "Image removed", "success");
      fetchImages();
    } catch (err) {
      Swal.fire("Error", "Delete failed", "error");
    }
  };

  return (
    <div className="container heart my-5">
      <h2 className="text-center mb-4">
        Manage Heart Convent Images
      </h2>

      {/* ================= FORM ================= */}
      <form onSubmit={handleSubmit} className="row g-3 mb-4">
        <div className="col-md-6">
          <input
            className="form-control"
            placeholder="Name (English)"
            value={formData.name_en}
            onChange={(e) =>
              setFormData({ ...formData, name_en: e.target.value })
            }
          />
        </div>

        <div className="col-md-6">
          <input
            className="form-control"
            placeholder="பெயர் (Tamil)"
            value={formData.name_ta}
            onChange={(e) =>
              setFormData({ ...formData, name_ta: e.target.value })
            }
          />
        </div>

        <div className="col-md-6">
          <input
            className="form-control"
            placeholder="Description (English)"
            value={formData.description_en}
            onChange={(e) =>
              setFormData({
                ...formData,
                description_en: e.target.value,
              })
            }
          />
        </div>

        <div className="col-md-6">
          <input
            className="form-control"
            placeholder="விவரம் (Tamil)"
            value={formData.description_ta}
            onChange={(e) =>
              setFormData({
                ...formData,
                description_ta: e.target.value,
              })
            }
          />
        </div>

        {!editingId && (
          <div className="col-md-12">
            <input
              type="file"
              className="form-control"
              ref={fileInputRef}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  image: e.target.files[0],
                })
              }
            />
          </div>
        )}

        <div className="col-12 text-center">
          <button
            className="btn btn-primary"
            disabled={uploading}
          >
            {uploading
              ? "Saving..."
              : editingId
              ? "Update"
              : "Upload"}
          </button>
        </div>
      </form>

      {/* ================= LIST ================= */}
      <div className="row">
        {images.map((img) => (
          <div
            key={img._id}
            className="col-md-4 mb-4 text-center"
          >
            <img
              src={img.imageUrl}
              alt={img.name.en}
              className="img-fluid rounded-circle shadow"
              style={{
                width: 250,
                height: 250,
                objectFit: "cover",
              }}
            />

            <h5 className="mt-3">{img.name.en}</h5>
            <p className="heart-description">
              {img.description.en}
            </p>

            <div className="d-flex justify-content-center">
              <button
                className="btn btn-warning me-2"
                onClick={() => handleEdit(img)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(img._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminHeartConvent;
