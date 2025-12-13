import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AdminAnbiyamCoordination.css";

const API_URL = import.meta.env.VITE_API_URL;

const AdminAnbiyamCoordination = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);

  // ✅ MUST MATCH BACKEND FIELDS
  const [formData, setFormData] = useState({
    name_en: "",
    name_ta: "",
    description_en: "",
    description_ta: "",
    image: null,
  });

  /* ================= FETCH ================= */
  const fetchMembers = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/acmembers`);
      setMembers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const ok = await Swal.fire({
      title: editId ? "Update member?" : "Create member?",
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
      setLoading(true);

      if (editId) {
        await axios.put(`${API_URL}/api/acmembers/${editId}`, data);
        Swal.fire("Updated!", "Member updated successfully", "success");
      } else {
        await axios.post(`${API_URL}/api/acmembers`, data);
        Swal.fire("Created!", "Member added successfully", "success");
      }

      setFormData({
        name_en: "",
        name_ta: "",
        description_en: "",
        description_ta: "",
        image: null,
      });
      setEditId(null);

      fetchMembers();
    } catch (err) {
      console.error(err);
      Swal.fire(
        "Error",
        err.response?.data?.message || "Upload failed",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  /* ================= EDIT ================= */
  const handleEdit = (member) => {
    setEditId(member._id);
    setFormData({
      name_en: member.name.en,
      name_ta: member.name.ta,
      description_en: member.description.en,
      description_ta: member.description.ta,
      image: null,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    const ok = await Swal.fire({
      title: "Delete this member?",
      icon: "warning",
      showCancelButton: true,
    });

    if (!ok.isConfirmed) return;

    try {
      await axios.delete(`${API_URL}/api/acmembers/${id}`);
      Swal.fire("Deleted!", "Member removed", "success");
      fetchMembers();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Delete failed", "error");
    }
  };

  return (
    <div className="container an-co mt-xxl-5 mt-0">
      <h2 className="mb-4 text-center">Manage Anbiyam Coordination</h2>

      {/* ================= FORM ================= */}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          className="form-control mb-2"
          placeholder="Name (English)"
          value={formData.name_en}
          onChange={(e) =>
            setFormData({ ...formData, name_en: e.target.value })
          }
          required
        />

        <input
          className="form-control mb-2"
          placeholder="பெயர் (Tamil)"
          value={formData.name_ta}
          onChange={(e) =>
            setFormData({ ...formData, name_ta: e.target.value })
          }
          required
        />

        <textarea
          className="form-control mb-2"
          placeholder="Description (English)"
          value={formData.description_en}
          onChange={(e) =>
            setFormData({
              ...formData,
              description_en: e.target.value,
            })
          }
          required
        />

        <textarea
          className="form-control mb-2"
          placeholder="விவரம் (Tamil)"
          value={formData.description_ta}
          onChange={(e) =>
            setFormData({
              ...formData,
              description_ta: e.target.value,
            })
          }
          required
        />

        <input
          type="file"
          className="form-control mb-3"
          onChange={(e) =>
            setFormData({ ...formData, image: e.target.files[0] })
          }
        />

        <button className="btn btn-primary" disabled={loading}>
          {loading ? "Saving..." : editId ? "Update" : "Upload"}
        </button>
      </form>

      <hr />

      {/* ================= LIST ================= */}
      <div className="row">
        {members.map((m) => (
          <div key={m._id} className="col-md-3 col-sm-6 mb-4">
            <div className="card shadow-sm text-center">
              <img
                src={m.imageUrl}
                className="card-img-top"
                alt={m.name.en}
              />
              <div className="card-body">
                <h5>{m.name.en}</h5>
                <p className="small">{m.description.en}</p>

                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(m)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(m._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminAnbiyamCoordination;
