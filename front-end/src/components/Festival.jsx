import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import { FiZoomIn, FiZoomOut, FiX, FiMaximize2 } from "react-icons/fi";
import "../Style/Festival.css"
const Festival = () => {
  const [show, setShow] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [images, setImages] = useState([]);

  // Fetch images from the backend
  const fetchImages = async () => {
    try {
      const response = await axios.get("http://localhost:9000/api/festival/images");
      setImages(response.data);
    } catch (err) {
      console.error("Error fetching images", err);
    }
  };

  // Load images when the component mounts
  useEffect(() => {
    fetchImages();
  }, []);

  // Zoom controls
  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.2, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.2, 1));
  const resetZoom = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <Container className="festival-container">
      <h2 className="text-center event-title mt-5">🎉 2024 Event Highlights 🎊</h2>

      <Row className="g-4 mt-4">
        {images.map((image, index) => (
          <Col md={4} sm={6} xs={12} key={index}>
            <div className="image-card" onClick={() => { setSelectedImage(image.url); setShow(true); }}>
              <img src={image.url} alt={`Event ${index + 1}`} className="event-img" />
              <div className="image-overlay">
                <FiMaximize2 className="overlay-icon" />
                <span>View Fullscreen</span>
              </div>
            </div>
          </Col>
        ))}
      </Row>

      <Modal show={show} onHide={resetZoom} centered size="xl">
        <Modal.Body className="modal-body-custom">
          <div className="modal-controls">
            <Button variant="light" onClick={handleZoomIn} className="control-btn"><FiZoomIn /></Button>
            <Button variant="light" onClick={handleZoomOut} className="control-btn"><FiZoomOut /></Button>
            <Button variant="light" onClick={resetZoom} className="control-btn">100%</Button>
            <Button variant="light" onClick={() => setShow(false)} className="close-btn"><FiX /></Button>
          </div>
          <div className="image-container" style={{ transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})` }}>
            <img src={selectedImage} alt="Popup" className="popup-img" />
          </div>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Festival;
