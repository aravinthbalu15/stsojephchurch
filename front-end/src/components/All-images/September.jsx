import React, { useEffect, useState } from "react";
import { Modal, Spinner, Alert } from "react-bootstrap";
import axios from "axios";
import "../../Style/Gallery.css";

const SeptemberGallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/images/month/September`
        );
        setGalleryItems(response.data);
      } catch (err) {
        console.error("September Fetch Error:", err);
        setError("Failed to fetch September gallery images");
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryItems();
  }, []);

  return (
    <div className="gallery-container container py-5 mt-5">
      <h2 className="text-center mb-4 gallery-title">September Gallery</h2>

      {loading ? (
        <Spinner animation="border" className="d-block mx-auto" />
      ) : error ? (
        <Alert variant="danger" className="text-center">{error}</Alert>
      ) : galleryItems.length === 0 ? (
        <Alert variant="info" className="text-center">
          No images found for September
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
                  alt={item.title?.en}
                  className="img-fluid rounded-3"
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />

                <div className="gallery-overlay rounded-3">
                  <h5 className="overlay-title">{item.title?.en}</h5>
                  <p className="overlay-text">{item.description?.en}</p>
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
              <Modal.Title>{selectedItem.title?.en}</Modal.Title>
            </Modal.Header>

            <Modal.Body className="text-center">
              <img
                src={selectedItem.url}
                alt={selectedItem.title?.en}
                className="img-fluid rounded-2"
                style={{ maxHeight: "70vh", objectFit: "contain" }}
              />
              <p className="mt-3">{selectedItem.description?.en}</p>
            </Modal.Body>
          </>
        )}
      </Modal>
    </div>
  );
};

export default SeptemberGallery;
