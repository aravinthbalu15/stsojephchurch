// AdminVideos.jsx
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Container, Form, Button, Row, Col, Card, Spinner } from "react-bootstrap";
import "./AdminVideoLink.css";

const API_URL = import.meta.env.VITE_API_URL; // ⭐ Global Backend URL

const AdminVideos = () => {
  const [title, setTitle] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [videos, setVideos] = useState([]);
  const [uploading, setUploading] = useState(false);

  const fileInputRef = useRef(null); // 👉 reset input ref

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/videolink`);
      setVideos(res.data);
    } catch (err) {
      console.error("Error fetching videos:", err);
    }
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!title || !videoFile) {
      Swal.fire("Missing Fields", "Please select a video and enter a title!", "warning");
      return;
    }

    try {
      setUploading(true);
      const base64Video = await toBase64(videoFile);

      await axios.post(`${API_URL}/api/videolink`, {
        title,
        videoBase64: base64Video,
      });

      Swal.fire("Success!", "Video uploaded successfully!", "success");

      setTitle("");
      setVideoFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";

      fetchVideos();
    } catch (err) {
      console.error("Upload failed:", err);
      Swal.fire("Error!", "Video upload failed!", "error");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "This video will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!confirmDelete.isConfirmed) return;

    try {
      await axios.delete(`${API_URL}/api/videolink/${id}`);
      Swal.fire("Deleted!", "Video has been deleted.", "success");
      fetchVideos();
    } catch (err) {
      console.error("Delete failed:", err);
      Swal.fire("Error!", "Failed to delete video.", "error");
    }
  };

  return (
    <div className="my-5 admin-linkvideo container">
      <h2 className="mb-4 fw-bold">Upload Church Videos</h2>

      <Form onSubmit={handleUpload}>
        <Form.Group controlId="videoTitle" className="mb-3">
          <Form.Label>Video Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter video title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="videoFile" className="mb-3">
          <Form.Label>Select Video</Form.Label>
          <Form.Control
            type="file"
            accept="video/*"
            ref={fileInputRef}
            onChange={(e) => setVideoFile(e.target.files[0])}
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={uploading} className="upload-big-btn">
          {uploading ? <><Spinner animation="border" size="sm" /> Uploading...</> : "Upload Video"}
        </Button>
      </Form>

      <hr className="my-5" />

      <h3 className="fw-bold">Uploaded Videos</h3>

      <Row>
        {videos.map((video) => (
          <Col md={4} lg={3} key={video._id} className="mb-4">
            <Card className="video-card-small shadow-sm">
              <div className="video-wrapper-small">
                <video className="video-small" controls>
                  <source src={video.videoUrl} type="video/mp4" />
                </video>
              </div>
              <Card.Body className="text-center p-2">
                <Card.Title className="small-title">{video.title}</Card.Title>
                <Button
                  variant="danger"
                  size="sm"
                  // className="w-100"
                  onClick={() => handleDelete(video._id)}
                >
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default AdminVideos;
