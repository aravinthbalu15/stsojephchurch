import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Button, Form, Card, Alert } from "react-bootstrap";
import "./AdminOldPriest.css";

const BASE_URL = import.meta.env.VITE_API_URL;

const AdminOldPriest = () => {
  const [priests, setPriests] = useState([]);
  const [newPriest, setNewPriest] = useState({
    name_en: "",
    name_ta: "",
    description_en: "",
    description_ta: "",
    period: "",
    image: null,
  });
  const [selectedPriest, setSelectedPriest] = useState(null);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  /* 🔄 FETCH */
  const fetchPriests = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/oldpriests`);
      setPriests(data);
    } catch {
      setError("Error fetching priests");
    }
  };

  useEffect(() => {
    fetchPriests();
  }, []);

  /* ✏️ INPUT HANDLER */
  const handleChange = ({ target: { name, value } }) =>
    setNewPriest((p) => ({ ...p, [name]: value }));

  const handleFileChange = (e) =>
    setNewPriest((p) => ({ ...p, image: e.target.files[0] || null }));

  /* ♻️ RESET */
  const resetForm = () => {
    setNewPriest({
      name_en: "",
      name_ta: "",
      description_en: "",
      description_ta: "",
      period: "",
      image: null,
    });
    setSelectedPriest(null);
    setError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  /* ➕ ADD */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      const formData = new FormData();
      Object.entries(newPriest).forEach(
        ([k, v]) => v && formData.append(k, v)
      );

      const { data } = await axios.post(
        `${BASE_URL}/api/oldpriests/old`,
        formData
      );

      Swal.fire("Success", "Priest added successfully", "success");
      setPriests((p) => [...p, data]);
      resetForm();
    } catch (err) {
      Swal.fire(
        "Error",
        err.response?.data?.message || "Upload failed",
        "error"
      );
    }

    setUploading(false);
  };

  /* ✏️ EDIT */
  const handleEdit = (priest) => {
    setSelectedPriest(priest);
    setNewPriest({
      name_en: priest.name.en,
      name_ta: priest.name.ta,
      description_en: priest.description.en,
      description_ta: priest.description.ta,
      period: priest.period,
      image: null,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPriest) return;

    setUploading(true);

    try {
      const formData = new FormData();
      Object.entries(newPriest).forEach(
        ([k, v]) => v && formData.append(k, v)
      );

      const { data } = await axios.put(
        `${BASE_URL}/api/oldpriests/${selectedPriest._id}`,
        formData
      );

      Swal.fire("Updated", "Priest updated successfully", "success");
      setPriests((p) =>
        p.map((i) => (i._id === selectedPriest._id ? data : i))
      );
      resetForm();
    } catch (err) {
      Swal.fire(
        "Error",
        err.response?.data?.message || "Update failed",
        "error"
      );
    }

    setUploading(false);
  };

  /* ❌ DELETE */
  const handleDelete = async (id) => {
    const ok = await Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
    });

    if (!ok.isConfirmed) return;

    await axios.delete(`${BASE_URL}/api/oldpriests/${id}`);
    setPriests((p) => p.filter((i) => i._id !== id));
    Swal.fire("Deleted", "Priest removed", "success");
  };

  return (
    <div className="container mt-5">
      <h2>Old Priests</h2>
      {error && <Alert variant="danger">{error}</Alert>}

      <Card className="p-3 mb-4">
        <h5>{selectedPriest ? "Edit Priest" : "Add Priest"}</h5>

        <Form onSubmit={selectedPriest ? handleEditSubmit : handleSubmit}>
          <Form.Control
            className="mb-2"
            name="name_en"
            placeholder="Name (English)"
            value={newPriest.name_en}
            onChange={handleChange}
            required
          />
          <Form.Control
            className="mb-2"
            name="name_ta"
            placeholder="பெயர் (Tamil)"
            value={newPriest.name_ta}
            onChange={handleChange}
            required
          />
          <Form.Control
            as="textarea"
            rows={2}
            className="mb-2"
            name="description_en"
            placeholder="Description (English)"
            value={newPriest.description_en}
            onChange={handleChange}
            required
          />
          <Form.Control
            as="textarea"
            rows={2}
            className="mb-2"
            name="description_ta"
            placeholder="விவரம் (Tamil)"
            value={newPriest.description_ta}
            onChange={handleChange}
            required
          />
          <Form.Control
            className="mb-2"
            name="period"
            placeholder="Period (e.g. 1998 – 2005)"
            value={newPriest.period}
            onChange={handleChange}
            required
          />
          <Form.Control
            type="file"
            className="mb-3"
            ref={fileInputRef}
            onChange={handleFileChange}
          />

          <Button type="submit" disabled={uploading}>
            {uploading ? "Saving..." : selectedPriest ? "Update" : "Add"}
          </Button>

          {selectedPriest && (
            <Button variant="secondary" className="ms-2" onClick={resetForm}>
              Cancel
            </Button>
          )}
        </Form>
      </Card>

      {/* LIST */}
      <div className="row">
        {priests.map((p) => (
          <div key={p._id} className="col-md-4 mb-3">
            <Card className="p-3 text-center">
              <img src={p.imageUrl} width={150} height={150} alt="" />
              <strong>{p.name.en}</strong>
              <p>{p.period}</p>
              <p>{p.description.en}</p>
              <Button size="sm" onClick={() => handleEdit(p)}>Edit</Button>{" "}
              <Button size="sm" variant="danger" onClick={() => handleDelete(p._id)}>
                Delete
              </Button>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOldPriest;
