import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import "./AdminFestivalImages.css";

const BASE_URL = "https://your-render-backend-url.onrender.com"; // ⭐ Change only here

const AdminFestivalImages = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false); 

  const fileInputRef = useRef(null);

  const fetchImages = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/festival/images`);
      setImages(response.data);
    } catch (err) {
      setMessage("Failed to fetch images.");
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const resetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedImage || !title) {
      setMessage("Please select an image and enter a title.");
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append("image", selectedImage);
    formData.append("title", title);

    try {
      await axios.post(`${BASE_URL}/api/festival/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("Image uploaded successfully!");
      setTitle("");
      setSelectedImage(null);

      resetFileInput();
      fetchImages();

      Swal.fire({
        icon: "success",
        title: "Uploaded!",
        text: "Festival image uploaded successfully!",
      });
    } catch (err) {
      setMessage("Failed to upload image.");
      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text: "There was an error uploading the image.",
      });
    }

    setUploading(false);
  };

  const confirmDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this image?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(`${BASE_URL}/api/festival/${id}`);
          setMessage(response.data.message);

          resetFileInput();
          fetchImages();

          Swal.fire("Deleted!", "The image has been deleted.", "success");
        } catch (err) {
          setMessage("Failed to delete image.");
          Swal.fire("Error", "There was a problem deleting the image.", "error");
        }
      }
    });
  };

  return (
    <div className="container admin-festival">
      <h3 className="mt-4 mb-3">Upload Festival Image</h3>
      {message && <p className="text-danger">{message}</p>}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTitle" className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter image title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formImage" className="mb-3">
          <Form.Label>Choose an image</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInputRef}
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={uploading}>
          {uploading ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
              Uploading...
            </>
          ) : (
            "Upload"
          )}
        </Button>
      </Form>

      <h3 className="mt-5 mb-3">Uploaded Festival Images</h3>
      <Row>
        {images.map((image) => (
          <Col key={image._id} md={4} sm={6} xs={12} className="mb-4">
            <div className="image-card p-3 border rounded shadow-sm h-100 text-center fade-in">
              <img
                src={image.url}
                alt={image.title}
                className="img-fluid rounded event-img mb-2"
              />
              <h5 className="mt-2">{image.title}</h5>
              <Button
                variant="danger"
                onClick={() => confirmDelete(image._id)}
                className="mt-2"
              >
                Delete
              </Button>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default AdminFestivalImages;
