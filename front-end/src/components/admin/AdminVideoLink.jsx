import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Form, Button, Row, Col, Card } from "react-bootstrap";

const AdminVideos = () => {
  const [title, setTitle] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const res = await axios.get("http://localhost:9000/api/videolink");
      setVideos(res.data);
    } catch (err) {
      console.error("Error fetching videos:", err);
    }
  };

  const toBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

const handleUpload = async (e) => {
  e.preventDefault();
  if (!title || !videoFile) {
    alert("Please select video and enter title");
    return;
  }

  try {
    const base64Video = await toBase64(videoFile);

    await axios.post("http://localhost:9000/api/videolink", {
      title,
      videoBase64: base64Video, // ✔ FIXED
    });

    setTitle("");
    setVideoFile(null);
    fetchVideos();
  } catch (err) {
    console.error("Upload failed:", err);
  }
};


  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await axios.delete(`http://localhost:9000/api/videolink/${id}`);
      fetchVideos();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <Container className="my-5">
      <h2 className="mb-4">Upload Church Videos</h2>

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
            onChange={(e) => setVideoFile(e.target.files[0])}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Upload Video
        </Button>
      </Form>

      <hr className="my-5" />

      <h3>Uploaded Videos</h3>
      <Row>
        {videos.map((video) => (
          <Col md={6} lg={4} key={video._id} className="mb-4">
            <Card>
              <video width="100%" controls>
                <source src={video.videoUrl} type="video/mp4" />
              </video>
              <Card.Body>
                <Card.Title>{video.title}</Card.Title>
                <Button variant="danger" onClick={() => handleDelete(video._id)}>
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

export default AdminVideos;
