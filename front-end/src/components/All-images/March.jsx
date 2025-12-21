import React, { useEffect, useState } from "react";
import { Modal, Spinner, Alert } from "react-bootstrap";
import axios from "axios";
import "../../Style/Gallery.css";
import { useTranslation } from "react-i18next";

const March = () => {
  const { t, i18n } = useTranslation();

  const lang = i18n.language === "ta" ? "ta" : "en";

  const [galleryItems, setGalleryItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/images/month/March`
        );
        setGalleryItems(response.data);
      } catch (err) {
        setError("Failed to fetch March gallery images");
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryItems();
  }, []);

  return (
    <div className="gallery-container container py-5 mt-5">
      <h2 className="text-center mb-4 gallery-title">
        {t("march_gallery")}
      </h2>

      {loading ? (
        <Spinner animation="border" className="d-block mx-auto" />
      ) : error ? (
        <Alert variant="danger" className="text-center">{error}</Alert>
      ) : galleryItems.length === 0 ? (
        <Alert variant="info" className="text-center">
          {t("no_images_found")}
        </Alert>
      ) : (
        <div className="row g-4 justify-content-center">
          {galleryItems.map((item) => (
            <div key={item._id} className="col-6 col-sm-4 col-md-4 col-lg-3">
              <div
                className="gallery-card position-relative"
                onClick={() => {
                  setSelectedItem(item);
                  setShowModal(true);
                }}
                style={{ height: "200px" }}
              >
                <img
                  src={item.url}
                  alt={item.title?.[lang]}
                  className="img-fluid rounded-3"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />

                <div className="gallery-overlay rounded-3">
                  <h5 className="overlay-title">
                    {item.title?.[lang]}
                  </h5>
                  <p className="overlay-text">
                    {item.description?.[lang]}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
        {selectedItem && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>
                {selectedItem.title?.[lang]}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
              <img
                src={selectedItem.url}
                alt={selectedItem.title?.[lang]}
                className="img-fluid rounded-2"
                style={{ maxHeight: "70vh", objectFit: "contain" }}
              />
              <p className="mt-3">
                {selectedItem.description?.[lang]}
              </p>
            </Modal.Body>
          </>
        )}
      </Modal>
    </div>
  );
};

export default March;
