import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "react-bootstrap";
import "../Style/Announcement.css";

const API_URL = "http://localhost:9000/api/announcements";

const Announcement = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await axios.get(API_URL);
        const today = new Date();

        const validAnnouncements = (res.data?.data || []).filter(
          (a) => !a.expiryDate || new Date(a.expiryDate) >= today
        );

        setAnnouncements(validAnnouncements);
      } catch (err) {
        console.log(err);
        setAnnouncements([]);
      }
    };
    fetchAnnouncements();
  }, []);

  const openImageModal = (imgUrl) => {
    setSelectedImage(imgUrl);
    setShowImageModal(true);
  };

  const general = announcements.filter(a => !a.imageUrl && !a.pdfUrl);
  const images = announcements.filter(a => a.imageUrl && !a.pdfUrl);
  const pdfs = announcements.filter(a => a.pdfUrl);

  return (
    <div className="ann-viewr announcement-wrapper container my-4">

      <h3 className="section-title">Announcements</h3>
      <div className="scroll-container">
        <div className="scroll-content">
          {general.map((g) => (
            <span key={g._id} className="scroll-item">
              <span className={`badge-category badge-${g.category}`}>
                {g.category.toUpperCase()}
              </span>
              📌 {g.title}
              &nbsp;&nbsp;&nbsp;
            </span>
          ))}
        </div>
      </div>

      <h3 className="section-title">Events & Highlights</h3>
      <div className="scroll-container">
        <div className="scroll-content">
          {images.map((img) => (
            <div
              className="image-box"
              key={img._id}
              onClick={() => openImageModal(img.imageUrl)}
            >
              <img src={img.imageUrl} className="event-img" alt={img.title} />
              <span className={`badge-category badge-${img.category}`}>
                {img.category.toUpperCase()}
              </span>
              <p className="img-title mt-2 fw-bold">{img.title}</p>
              <small className="text-muted">{new Date(img.createdAt).toLocaleDateString()}</small>
            </div>
          ))}
        </div>
      </div>

      <h3 className="section-title">Important Documents</h3>
      <div className="scroll-container">
        <div className="scroll-content">
          {pdfs.map((p) => (
            <span key={p._id} className="scroll-item">

              <img
                src="https://cdn-icons-png.flaticon.com/512/337/337946.png"
                alt="pdf"
                className="pdf-svg-icon"
              />

              {p.title} —

              <a href={p.pdfUrl} target="_blank" download className="btn btn-link download-btn">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/992/992651.png"
                  alt="download"
                  className="download-icon"
                />
              </a>

              &nbsp;&nbsp;&nbsp;&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* IMAGE POPUP MODAL */}
      <Modal centered show={showImageModal} onHide={() => setShowImageModal(false)} size="lg">
        <Modal.Body className="text-center">
          <img src={selectedImage} alt="view" className="modal-view-img img-fluid rounded" />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Announcement;
