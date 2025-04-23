import React, { useState } from "react";
import { Form, Button, Container, Card, Alert } from "react-bootstrap";
import axios from "axios";

const AdminAddImages = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !image) {
      setMessage("Please fill all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", image);

    try {
      await axios.post("http://localhost:9000/upload", formData);
      setMessage("✅ Image uploaded successfully!");
      setTitle("");
      setImage(null);
      setPreview(null);
    } catch (err) {
      console.error(err);
      setMessage("❌ Upload failed.");
    }
  };

  return (
    <Container className="admin-container my-5">
      <Card className="shadow-lg p-4" style={{ maxWidth: "600px", margin: "auto" }}>
        <h2 className="text-center mb-4">Add Announcement Image</h2>
        {message && <Alert variant="info">{message}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="title">
            <Form.Label>Image Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="image" className="mt-3">
            <Form.Label>Upload Image</Form.Label>
            <Form.Control type="file" accept="image/*" onChange={handleImageChange} required />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-3"
                style={{ width: "100%", height: "auto", borderRadius: "10px" }}
              />
            )}
          </Form.Group>

          <Button type="submit" className="mt-4 w-100" variant="primary">
            Upload Image
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default AdminAddImages;
