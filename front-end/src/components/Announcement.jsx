import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "react-bootstrap";
import "../Style/Announcement.css";
import { useTranslation } from "react-i18next";

const Announcement = () => {
  const { t } = useTranslation();

  const [announcements, setAnnouncements] = useState([]);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/announcements`
        );

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

  // Filter announcements
  const general = announcements.filter(
    (a) => !a.imageUrl?.trim() && !a.pdfUrl?.trim()
  );

  const images = announcements.filter(
    (a) => a.imageUrl?.trim() && !a.pdfUrl?.trim()
  );

  const pdfs = announcements.filter(
    (a) => a.pdfUrl?.trim()
  );

  return (
    <div className="ann-viewr container">

      {/* GENERAL ANNOUNCEMENTS */}
      {general.length > 0 && (
        <>
          <h3 className="section-title">
            {t("latest_announcements") || "Latest Announcements"}
          </h3>

          <div className="announce-ticker mb-5">
            <div className="ticker-track">
              {general.map((g) => (
                <span key={g._id} className="ticker-item">
                  <span className={`badge-category badge-${g.category}`}>
                    {g.category.toUpperCase()}
                  </span>
                  &nbsp;{g.title}
                </span>
              ))}
            </div>
          </div>
        </>
      )}

      {/* IMAGE ANNOUNCEMENTS */}
      {images.length > 0 && (
        <>
          <h3 className="section-title">
            {t("events_highlights") || "Events & Highlights"}
          </h3>

          <div className="event-grid mb-5">
            {images.map((img) => (
              <div
                className="event-card"
                key={img._id}
                onClick={() => openImageModal(img.imageUrl)}
              >
                <img
                  src={img.imageUrl}
                  className="event-img"
                  alt={img.title}
                />

                <div className="event-body">
                  <span className={`badge-category badge-${img.category}`}>
                    {img.category.toUpperCase()}
                  </span>

                  <div className="event-title">{img.title}</div>

                  <div className="event-date">
                    {new Date(img.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* PDF DOCUMENTS */}
      {pdfs.length > 0 && (
        <>
          <h3 className="section-title">
            {t("important_documents") || "Important Documents"}
          </h3>

          <div className="doc-list">
            {pdfs.map((p) => (
              <div className="doc-item" key={p._id}>
                <span className="doc-title">📄 {p.title}</span>

                <a
                  href={p.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                >
                  Download ⬇
                </a>
              </div>
            ))}
          </div>
        </>
      )}

      {/* IMAGE MODAL */}
      <Modal
        show={showImageModal}
        onHide={() => setShowImageModal(false)}
        centered
        size="lg"
      >
        <Modal.Body className="p-0">
          <img
            src={selectedImage}
            alt="Announcement"
            className="img-fluid w-100"
          />
        </Modal.Body>
      </Modal>

      {/* NO DATA */}
      {general.length === 0 &&
        images.length === 0 &&
        pdfs.length === 0 && (
          <div className="text-center py-5">
            <h5>No announcements available.</h5>
          </div>
        )}
    </div>
  );
};

export default Announcement;