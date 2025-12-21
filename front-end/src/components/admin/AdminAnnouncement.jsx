import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AdminAnnouncement.css"
const API_URL = `${import.meta.env.VITE_API_URL}/api/announcements`;

const AdminAnnouncement = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "general",
    eventDate: "",
    expiryDate: "",
    imageBase64: "",
    pdfBase64: "",
  });

  // Convert File to Base64
  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  // Upload Image
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    Swal.fire({ title: "Uploading Image...", allowOutsideClick: false, didOpen: () => Swal.showLoading() });
    const base64 = await fileToBase64(file);
    setFormData({ ...formData, imageBase64: base64 });
    Swal.close();
  };

  // Upload PDF
  const handlePDFChange = async (e) => {
    const file = e.target.files[0];
    Swal.fire({ title: "Uploading PDF...", allowOutsideClick: false, didOpen: () => Swal.showLoading() });
    const base64 = await fileToBase64(file);
    setFormData({ ...formData, pdfBase64: base64 });
    Swal.close();
  };

  // Fetch all announcements
  const fetchAnnouncements = async () => {
    try {
      const res = await axios.get(API_URL);
      setAnnouncements(res.data?.data || []);
    } catch (err) {
      console.log(err);
      setAnnouncements([]);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  // Submit (Create & Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, formData);
        Swal.fire("Updated!", "Announcement updated successfully", "success");
      } else {
        await axios.post(API_URL, formData);
        Swal.fire("Created!", "Announcement added successfully", "success");
      }

      setFormData({
        title: "",
        description: "",
        category: "general",
        eventDate: "",
        expiryDate: "",
        imageBase64: "",
        pdfBase64: "",
      });

      setEditingId(null);
      fetchAnnouncements();
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  // Edit
  const handleEdit = (a) => {
    setEditingId(a._id);
    setFormData({
      title: a.title,
      description: a.description,
      category: a.category,
      eventDate: a.eventDate?.substring(0, 10),
      expiryDate: a.expiryDate?.substring(0, 10),
      imageBase64: "",
      pdfBase64: "",
    });
  };

  // Delete
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Delete this announcement?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "red",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(`${API_URL}/${id}`);
        fetchAnnouncements();
        Swal.fire("Deleted!", "", "success");
      }
    });
  };

  return (
    <div className=" admin-dashannouncement container my-4">
      <h2 className="fw-bold text-center mb-4">Admin Announcement Panel</h2>

      {/* Form */}
      <form className="card shadow p-4" onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          placeholder="Announcement Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />

        <textarea
          className="form-control mb-2"
          placeholder="Description"
          rows="4"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          required
        ></textarea>

        <select
          className="form-select mb-2"
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
        >
          <option value="general">General</option>
          <option value="event">Event</option>
          <option value="meeting">Meeting</option>
          <option value="mass">Mass</option>
          <option value="festival">Festival</option>
          <option value="obituary">Obituary</option>
          <option value="youth">Youth</option>
          <option value="children">Children</option>
        </select>

        <label className="fw-semibold">Event Date</label>
        <input
          type="date"
          className="form-control mb-2"
          value={formData.eventDate}
          onChange={(e) =>
            setFormData({ ...formData, eventDate: e.target.value })
          }
        />

        <label className="fw-semibold">Expiry Date</label>
        <input
          type="date"
          className="form-control mb-2"
          value={formData.expiryDate}
          onChange={(e) =>
            setFormData({ ...formData, expiryDate: e.target.value })
          }
        />

        <label>Upload Image</label>
        <input type="file" className="form-control mb-2" onChange={handleImageChange} />

        <label>Upload PDF (Optional)</label>
        <input type="file" className="form-control mb-2" onChange={handlePDFChange} />

        <button className="btn btn-danger mt-2">
          {editingId ? "Update Announcement" : "Add Announcement"}
        </button>
      </form>

      {/* Table */}
      <h4 className="mt-4 fw-bold">All Announcements</h4>

      <table className="table table-bordered table-hover mt-2">
        <thead className="table-dark">
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Event Date</th>
            <th>Image</th>
            <th>PDF</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {announcements.length > 0 ? (
            announcements.map((a) => (
              <tr key={a._id}>
                <td>{a.title}</td>
                <td>{a.category}</td>
                <td>{a.eventDate && a.eventDate.substring(0, 10)}</td>
                <td>{a.imageUrl && <img src={a.imageUrl} width="60" alt="" />}</td>
                <td>{a.pdfUrl && <a href={a.pdfUrl}>PDF</a>}</td>
                <td>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(a)}>Edit</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(a._id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="6" className="text-center py-3">No Announcements Found</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminAnnouncement;
