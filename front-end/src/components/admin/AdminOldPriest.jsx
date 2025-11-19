import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Button, Form, Card, ListGroup, Alert } from "react-bootstrap";
import "./AdminOldPriest.css"; // add this CSS file

const AdminOldPriest = () => {
  const [priests, setPriests] = useState([]);
  const [newPriest, setNewPriest] = useState({
    name: "",
    description: "",
    dob_start: "",
    dob_end: "",
    image: null,
  });
  const [selectedPriest, setSelectedPriest] = useState(null);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false); // ← ADDED
  const fileInputRef = useRef(null);

  const fetchPriests = async () => {
    try {
      const response = await axios.get("http://localhost:9000/api/oldpriests");
      setPriests(response.data);
    } catch (err) {
      console.error(err);
      setError("Error fetching priests");
    }
  };

  useEffect(() => {
    fetchPriests();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPriest((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setNewPriest((prevState) => ({
      ...prevState,
      image: e.target.files[0] || null,
    }));
  };

  const resetForm = () => {
    setNewPriest({
      name: "",
      description: "",
      dob_start: "",
      dob_end: "",
      image: null,
    });
    setSelectedPriest(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true); // ← ADDED

    if (!newPriest.name || !newPriest.description || !newPriest.dob_start || !newPriest.dob_end) {
      Swal.fire("Error", "Please fill in all required fields.", "error");
      setUploading(false); // ← ADDED
      return;
    }

    const formData = new FormData();
    formData.append("name", newPriest.name);
    formData.append("description", newPriest.description);
    formData.append("dob_start", newPriest.dob_start);
    formData.append("dob_end", newPriest.dob_end);
    if (newPriest.image) formData.append("image", newPriest.image);

    try {
      const res = await axios.post("http://localhost:9000/api/oldpriests/old", formData);
      Swal.fire("Success!", "Priest added successfully.", "success");

      if (res.data) setPriests((prev) => [...prev, res.data]);
      else fetchPriests();

      resetForm();
    } catch (err) {
      console.error("Error adding priest:", err);
      Swal.fire("Error!", "There was an error adding the priest.", "error");
      setError("Error adding priest");
    }

    setUploading(false); // ← ADDED
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:9000/api/oldpriests/${id}`)
          .then(() => {
            Swal.fire("Deleted!", "Priest has been deleted.", "success");
            setPriests((prev) => prev.filter((pr) => pr._id !== id));
          })
          .catch((err) => {
            console.error(err);
            Swal.fire("Error!", "There was an error deleting the priest.", "error");
            setError("Error deleting priest");
          });
      }
    });
  };

  const handleEdit = (priest) => {
    setSelectedPriest(priest);
    setNewPriest({
      name: priest.name || "",
      description: priest.description || "",
      dob_start: priest.dob_start ? priest.dob_start.split("T")[0] : "",
      dob_end: priest.dob_end ? priest.dob_end.split("T")[0] : "",
      image: null,
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setUploading(true); // ← ADDED

    if (!selectedPriest) return;

    const formData = new FormData();
    formData.append("name", newPriest.name);
    formData.append("description", newPriest.description);
    formData.append("dob_start", newPriest.dob_start);
    formData.append("dob_end", newPriest.dob_end);
    if (newPriest.image) formData.append("image", newPriest.image);

    try {
      const res = await axios.put(
        `http://localhost:9000/api/oldpriests/${selectedPriest._id}`,
        formData
      );
      Swal.fire("Updated!", "Priest updated successfully.", "success");

      if (res.data) {
        setPriests((prev) =>
          prev.map((p) => (p._id === selectedPriest._id ? res.data : p))
        );
      } else fetchPriests();

      resetForm();
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", "There was an error updating the priest.", "error");
      setError("Error updating priest");
    }

    setUploading(false); // ← ADDED
  };

  return (
    <div className="old-pre container mt-5">
      <h2 className="mb-4">Old Priests</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      <div className="mb-4">
        <Card.Body>
          <h4>{selectedPriest ? "Edit Priest" : "Add New Priest"}</h4>

          <Form onSubmit={selectedPriest ? handleEditSubmit : handleSubmit}>
            <Form.Group controlId="formName" className="mb-2">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={newPriest.name}
                onChange={handleChange}
                placeholder="Enter priest's name"
                required
              />
            </Form.Group>

            <Form.Group controlId="formDescription" className="mb-2">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={newPriest.description}
                onChange={handleChange}
                placeholder="Enter description"
                required
              />
            </Form.Group>

            <Form.Group controlId="formDobStart" className="mb-2">
              <Form.Label>Date of Birth (Start)</Form.Label>
              <Form.Control
                type="date"
                name="dob_start"
                value={newPriest.dob_start}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formDobEnd" className="mb-2">
              <Form.Label>Date of Birth (End)</Form.Label>
              <Form.Control
                type="date"
                name="dob_end"
                value={newPriest.dob_end}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formImage" className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                name="image"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
              />
            </Form.Group>

            <div className="d-flex gap-2">
              <Button variant="primary" type="submit" disabled={uploading}>
                {uploading
                  ? "Uploading..."
                  : selectedPriest
                  ? "Update Priest"
                  : "Add Priest"}
              </Button>

              {selectedPriest && (
                <Button variant="secondary" onClick={resetForm}>
                  Cancel
                </Button>
              )}
            </div>
          </Form>
        </Card.Body>
      </div>

      <h4 className="mb-3">Priests List</h4>

      <div className="row">
        {priests.map((priest) => (
          <div key={priest._id} className="col-sm-6 col-md-4 mb-4 d-flex justify-content-center">
            <div className="priest-card text-center p-3">
              <img 
  src={priest.imageUrl}
  alt={priest.name}
  className="priest-img"
  style={{ marginLeft: "33px" }}  // increase this value
  width={150}
  height={150}
/>

              <div className="mt-3">
                <strong className="d-block">{priest.name}</strong>
                <small className="d-block text-muted">
                  {priest.dob_start ? new Date(priest.dob_start).toLocaleDateString() : ""}{" - "}
                  {priest.dob_end ? new Date(priest.dob_end).toLocaleDateString() : ""}
                </small>

                <p className="mt-2 mb-2 priest-desc">{priest.description}</p>

                <div className="d-flex justify-content-center gap-2">
                  <Button variant="warning" size="sm" onClick={() => handleEdit(priest)}>
                    Edit
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(priest._id)}>
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOldPriest;
