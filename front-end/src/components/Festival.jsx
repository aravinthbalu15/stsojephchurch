import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import { FiZoomIn, FiZoomOut, FiX, FiMaximize2 } from "react-icons/fi";
import "../Style/Festival.css";
import { useTranslation } from "react-i18next";

const Festival = () => {
  const { t } = useTranslation();

  const [show, setShow] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch images from backend
  const fetchImages = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/festival/images`);
      setImages(response.data || []);
    } catch (err) {
      console.error("Error fetching festival images:", err);
      setError("Failed to load festival images. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

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

  // Drag functionality
  const startDrag = (e) => {
    setDragging(true);
    setStartPos({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const duringDrag = (e) => {
    if (dragging) {
      setPosition({ x: e.clientX - startPos.x, y: e.clientY - startPos.y });
    }
  };

  const stopDrag = () => setDragging(false);

  if (loading) return <p className="loading-text">Loading...</p>;
  if (error) return <p className="loading-text">{error}</p>;

  return (
    <Container className="festival-main container">
      <h2 className="text-center event-title mt-5">{t("festival")}</h2>

      <Row className="g-4 mt-4">
        {images.length > 0 ? (
          images.map((image, index) => (
            <Col md={4} sm={6} xs={12} key={index}>
              <div className="image-card"
                onClick={() => { setSelectedImage(image.url); setShow(true); }}
              >
                <img src={image.url} alt={`Event ${index + 1}`} className="event-img" />
                <div className="image-overlay">
                  <FiMaximize2 className="overlay-icon" />
                  <span>View Fullscreen</span>
                </div>
              </div>
            </Col>
          ))
        ) : (
          <p className="loading-text text-center">No images available</p>
        )}
      </Row>

      {/* Modal Popup */}
      <Modal show={show} onHide={() => setShow(false)} centered size="xl">
        <Modal.Body
          className="modal-body-custom"
          onMouseDown={startDrag}
          onMouseMove={duringDrag}
          onMouseUp={stopDrag}
          onMouseLeave={stopDrag}
        >
          <div className="modal-controls">
            <Button variant="light" onClick={handleZoomIn} className="control-btn"><FiZoomIn /></Button>
            <Button variant="light" onClick={handleZoomOut} className="control-btn"><FiZoomOut /></Button>
            <Button variant="light" onClick={resetZoom} className="control-btn">100%</Button>
            <Button variant="light" onClick={() => setShow(false)} className="close-btn"><FiX /></Button>
          </div>

          <div
            className="image-container"
            style={{ transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})` }}
          >
            <img src={selectedImage} alt="Popup" className="popup-img" draggable="false" />
          </div>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Festival;
