import React, { useState, useEffect } from "react";
import axios from "axios";
import Masonry from "react-masonry-css";
import "../Style/Festival.css";
import { Modal, Button } from "react-bootstrap";
import { FiZoomIn, FiZoomOut, FiX } from "react-icons/fi";
import { useTranslation } from "react-i18next";

const Festival = () => {
  const { t } = useTranslation();

  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/festival/images`)
      .then((res) => setImages(res.data))
      .catch(() => console.log("Error loading festival images"));
  }, []);

  const openImage = (url) => {
    setSelectedImage(url);
    setShowModal(true);
  };

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.2, 3));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.2, 1));
  const resetZoom = () => setZoom(1);

  const breakpoints = {
    default: 3,
    992: 2,
    576: 1,
  };

  return (
    <div className="festival-main container">
      <h2 className="event-title text-center mt-5">{t("festival")}</h2>

      <Masonry breakpointCols={breakpoints} className="masonry-grid" columnClassName="masonry-column">
        {images.map((image, index) => (
          <div key={index} className="masonry-item" onClick={() => openImage(image.url)}>
            <img src={image.url} alt="Festival" className="masonry-img" />
          </div>
        ))}
      </Masonry>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="xl">
        <Modal.Body className="modal-body-custom">
          <div className="modal-btns">
            <Button variant="light" className="zoom-btn" onClick={handleZoomIn}><FiZoomIn /></Button>
            <Button variant="light" className="zoom-btn" onClick={handleZoomOut}><FiZoomOut /></Button>
            <Button variant="light" className="zoom-btn" onClick={resetZoom}>100%</Button>
            <Button variant="light" className="zoom-btn" onClick={() => setShowModal(false)}><FiX /></Button>
          </div>

          <img
            src={selectedImage}
            alt="zoom"
            className="zoom-image"
            style={{ transform: `scale(${zoom})` }}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Festival;
