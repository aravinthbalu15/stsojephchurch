import React, { useEffect, useState } from 'react';
import { Modal, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';
import '../../Style/Gallery.css';

const February = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        const response = await axios.get('http://localhost:9000/api/images/February');
        setGalleryItems(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch gallery images');
        setLoading(false);
        console.error('Fetch error:', err);
      }
    };

    fetchGalleryItems();
  }, []);

  const handleImageClick = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  return (
    <div className="gallery-container container py-5 mt-5">
      <h2 className="text-center mb-4 gallery-title">February Gallery</h2>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : error ? (
        <Alert variant="danger" className="text-center">{error}</Alert>
      ) : galleryItems.length === 0 ? (
        <Alert variant="info" className="text-center">No images found for February</Alert>
      ) : (
        <div className="row g-4 justify-content-center">
          {galleryItems.map((item) => (
            <div key={item._id} className="col-6 col-sm-4 col-md-4 col-lg-3">
              <div
                className="gallery-card position-relative"
                onClick={() => handleImageClick(item)}
                style={{ height: '200px' }}
              >
                <img
                  src={item.url}
                  alt={item.title}
                  className="img-fluid rounded-3"
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div className="gallery-overlay rounded-3">
                  <h5 className="overlay-title">{item.title}</h5>
                  <p className="overlay-text">{item.description}</p>
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
              <Modal.Title>{selectedItem.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
              <img
                src={selectedItem.url}
                alt={selectedItem.title}
                className="img-fluid rounded-2"
                style={{ maxHeight: '70vh', objectFit: 'contain' }}
              />
              <p className="mt-3">{selectedItem.description}</p>
            </Modal.Body>
          </>
        )}
      </Modal>
    </div>
  );
};

export default February;