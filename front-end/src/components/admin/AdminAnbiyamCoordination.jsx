import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AdminAnbiyamCoordination.css";

const AdminAnbiyamCoordination = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name_en: "",
    name_ta: "",
    description_en: "",
    description_ta: "",
    image: null,
  });

  const [editId, setEditId] = useState(null);

  const fetchMembers = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/acmembers`
    );
    setMembers(res.data);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const confirm = await Swal.fire({
      title: editId ? "Update member?" : "Create member?",
      icon: "question",
      showCancelButton: true,
    });

    if (!confirm.isConfirmed) return;

    const data = new FormData();
    Object.entries(formData).forEach(
      ([k, v]) => v && data.append(k, v)
    );

    try {
      setLoading(true);

      if (editId) {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/api/acmembers/${editId}`,
          data
        );
        Swal.fire("Updated!", "Member updated", "success");
      } else {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/acmembers`,
          data
        );
        Swal.fire("Created!", "Member added", "success");
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
      Swal.fire("Error", "Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (m) => {
    setEditId(m._id);
    setFormData({
      name_en: m.name.en,
      name_ta: m.name.ta,
      description_en: m.description.en,
      description_ta: m.description.ta,
      image: null,
    });
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete?",
      icon: "warning",
      showCancelButton: true,
    });
    if (!confirm.isConfirmed) return;

    await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/acmembers/${id}`
    );
    fetchMembers();
  };

  return (
    <div className="container an-co mt-xxl-5 mt-0">
      <h2 className="text-center mb-4">Manage Anbiyam Coordination</h2>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input className="form-control mb-2" placeholder="Name (English)"
          value={formData.name_en}
          onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
          required />

        <input className="form-control mb-2" placeholder="பெயர் (Tamil)"
          value={formData.name_ta}
          onChange={(e) => setFormData({ ...formData, name_ta: e.target.value })}
          required />

        <textarea className="form-control mb-2" placeholder="Description (English)"
          value={formData.description_en}
          onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
          required />

        <textarea className="form-control mb-2" placeholder="விவரம் (Tamil)"
          value={formData.description_ta}
          onChange={(e) => setFormData({ ...formData, description_ta: e.target.value })}
          required />

        <input type="file" className="form-control mb-3"
          onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })} />

        <button className="btn btn-primary" disabled={loading}>
          {loading ? "Saving..." : editId ? "Update" : "Upload"}
        </button>
      </form>

      <hr />

      <div className="row">
        {members.map((m) => (
          <div className="col-md-3 col-sm-6 mb-4" key={m._id}>
            <div className="card text-center">
              <img src={m.imageUrl} className="card-img-top" />
              <div className="card-body">
                <h5>{m.name.en}</h5>
                <p>{m.description.en}</p>
                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(m)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(m._id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminAnbiyamCoordination;
