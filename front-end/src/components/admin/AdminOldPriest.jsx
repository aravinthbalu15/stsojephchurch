import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Button, Form, Card, ListGroup, Alert } from "react-bootstrap";

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

  // Fetch all priests
  useEffect(() => {
    axios
      .get("http://localhost:9000/api/oldpriests")
      .then((response) => setPriests(response.data))
      .catch((err) => setError("Error fetching priests"));
  }, []);

  // Handle form input changes
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
      image: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data:", newPriest); // Check the data before sending
  
    const formData = new FormData();
    formData.append("name", newPriest.name);
    formData.append("description", newPriest.description);
    formData.append("dob_start", newPriest.dob_start);
    formData.append("dob_end", newPriest.dob_end);
    formData.append("image", newPriest.image);
  
    axios
      .post("http://localhost:9000/api/oldpriests/old", formData)
      .then((response) => {
        Swal.fire("Success!", "Priest added successfully.", "success");
        setPriests([...priests, response.data]);
        setNewPriest({
          name: "",
          description: "",
          dob_start: "",
          dob_end: "",
          image: null,
        });
      })
      .catch((err) => {
        console.error("Error adding priest:", err); // Log the error
        Swal.fire("Error!", "There was an error adding the priest.", "error");
        setError("Error adding priest");
      });
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
            setPriests(priests.filter((priest) => priest._id !== id));
          })
          .catch((err) => {
            Swal.fire("Error!", "There was an error deleting the priest.", "error");
            setError("Error deleting priest");
          });
      }
    });
  };

  const handleEdit = (priest) => {
    setSelectedPriest(priest);
    setNewPriest({
      name: priest.name,
      description: priest.description,
      dob_start: priest.dob_start,
      dob_end: priest.dob_end,
      image: null,
    });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", newPriest.name);
    formData.append("description", newPriest.description);
    formData.append("dob_start", newPriest.dob_start);
    formData.append("dob_end", newPriest.dob_end);
    if (newPriest.image) {
      formData.append("image", newPriest.image);
    }

    axios
      .put(`http://localhost:9000/api/oldpriests/${selectedPriest._id}`, formData)
      .then((response) => {
        Swal.fire("Updated!", "Priest updated successfully.", "success");
        setPriests(
          priests.map((priest) =>
            priest._id === selectedPriest._id ? response.data : priest
          )
        );
        setNewPriest({
          name: "",
          description: "",
          dob_start: "",
          dob_end: "",
          image: null,
        });
        setSelectedPriest(null);
      })
      .catch((err) => {
        Swal.fire("Error!", "There was an error updating the priest.", "error");
        setError("Error updating priest");
      });
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Old Priests</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      <Card className="mb-4">
        <Card.Body>
          <h4>{selectedPriest ? "Edit Priest" : "Add New Priest"}</h4>
          <Form onSubmit={selectedPriest ? handleEditSubmit : handleSubmit}>
            <Form.Group controlId="formName">
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

            <Form.Group controlId="formDescription">
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

            <Form.Group controlId="formDobStart">
              <Form.Label>Date of Birth (Start)</Form.Label>
              <Form.Control
                type="date"
                name="dob_start"
                value={newPriest.dob_start}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formDobEnd">
              <Form.Label>Date of Birth (End)</Form.Label>
              <Form.Control
                type="date"
                name="dob_end"
                value={newPriest.dob_end}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formImage">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                name="image"
                onChange={handleFileChange}
                accept="image/*"
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              {selectedPriest ? "Update Priest" : "Add Priest"}
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <h4>Priests List</h4>
      <ListGroup>
        {priests.map((priest) => (
          <ListGroup.Item key={priest._id} className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <img src={priest.imageUrl} alt={priest.name} width={50} className="mr-3" />
              <div>
                <strong>{priest.name}</strong>
                <div>{priest.description}</div>
                <small>Born: {new Date(priest.dob_start).toLocaleDateString()}</small>
              </div>
            </div>
            <div>
              <Button
                variant="warning"
                size="sm"
                className="mr-2"
                onClick={() => handleEdit(priest)}
              >
                Edit
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleDelete(priest._id)}
              >
                Delete
              </Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default AdminOldPriest;
