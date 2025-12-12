import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import { FiMaximize2, FiX } from "react-icons/fi";
import "../Style/Festival.css";
import { useTranslation } from "react-i18next";

const Festival = () => {
  const { t } = useTranslation();

  const [show, setShow] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchImages = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/festival/images`);
      setImages(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  if (loading) return <p className="text-center mt-5">Loading...</p>;

  return (
    <Container className="festival-wrapper">
      <h2 className="section-title text-center mb-4">{t("festival")}</h2>

      <Row className="g-4">
        {images.map((img, index) => (
          <Col md={4} sm={6} xs={12} key={index}>
            <div
              className="festival-card"
              onClick={() => {
                setSelectedImage(img.url);
                setShow(true);
              }}
            >
              <img src={img.url} className="img-fluid rounded" alt="Festival" />

              <div className="festival-overlay">
                <FiMaximize2 className="overlay-icon" />
              </div>
            </div>
          </Col>
        ))}
      </Row>

      {/* Image Modal */}
     <Modal
  show={show}
  onHide={() => setShow(false)}
  centered
  size="xl"
  dialogClassName="festival-modal"
>
  <Modal.Body className="modal-body-wrapper">
    <Button className="close-btn" onClick={() => setShow(false)}>
      <FiX />
    </Button>

    <div className="modal-image-container">
      <img src={selectedImage} alt="Full View" className="modal-image" />
    </div>
  </Modal.Body>
</Modal>

    </Container>
  );
};

export default Festival;
