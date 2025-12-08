import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Form, Button, Row, Col, Card } from "react-bootstrap";
import Swal from "sweetalert2";
import "./AdminImgLinkUpload.css";

const BASE_URL = `${import.meta.env.VITE_API_URL}`;   // ⭐ GLOBAL API BASE URL

const AdminImgLink = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchImages = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/imglink`);
      setImages(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    if (image) formData.append("image", image);

    try {
      setLoading(true);

      if (editId) {
        await axios.put(`${BASE_URL}/api/imglink/${editId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        Swal.fire("Updated!", "Image updated successfully!", "success");
      } else {
        if (!image) return Swal.fire("Error", "Please select an image", "error");

        await axios.post(`${BASE_URL}/api/imglink`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        Swal.fire("Uploaded!", "Image uploaded successfully!", "success");
      }

      setTitle("");
      setImage(null);
      setEditId(null);
      document.querySelector("#imageInput").value = "";

      fetchImages();
    } catch (err) {
      console.error("Upload error:", err);
      Swal.fire("Error", "Something went wrong!", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (img) => {
    setTitle(img.title);
    setEditId(img._id);
    document.querySelector("#imageInput").value = "";
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This image will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${BASE_URL}/api/imglink/${id}`);
        fetchImages();
        Swal.fire("Deleted!", "Image has been deleted.", "success");
      } catch (err) {
        console.error("Delete error:", err);
        Swal.fire("Error", "Failed to delete image", "error");
      }
    }
  };

  return (
    <Container className="img-link-admin mt-5">
      <h3 className="mb-4">Manage Image Gallery</h3>

      <Form onSubmit={handleSubmit} className="mb-5">
        <Form.Group controlId="formTitle" className="mb-3">
          <Form.Label>Image Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter image title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formImage" className="mb-3">
          <Form.Label>Select Image</Form.Label>
          <Form.Control
            id="imageInput"
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required={!editId}
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? "Uploading..." : editId ? "Update" : "Upload"}
        </Button>

        {editId && (
          <Button
            variant="secondary"
            className="ms-2"
            onClick={() => {
              setEditId(null);
              setTitle("");
              setImage(null);
              document.querySelector("#imageInput").value = "";
            }}
          >
            Cancel
          </Button>
        )}
      </Form>

      <Row>
        {images.map((img) => (
          <Col key={img._id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Card className="square-card shadow-sm">
              <Card.Img variant="top" src={img.imageUrl} className="square-img" />
              <Card.Body className="text-center">
                <Card.Title className="text-truncate">{img.title}</Card.Title>

                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => handleEdit(img)}
                  className="me-2"
                >
                  Edit
                </Button>

                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(img._id)}
                >
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AdminImgLink;
