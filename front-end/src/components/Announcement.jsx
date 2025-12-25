import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "react-bootstrap";
import "../Style/Announcement.css";
import { useTranslation } from "react-i18next";
const Announcement = () => {
  const { t } = useTranslation(); // 🆕 Added
  const [announcements, setAnnouncements] = useState([]);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/announcements`);
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
   <div className="ann-viewr container">

  {/* LATEST ANNOUNCEMENTS */}
  <h3 className="section-title">Latest Announcements</h3>
  <div className="announce-ticker mb-5">
    <div className="ticker-track">
      {general.map(g => (
        <span key={g._id} className="ticker-item">
          <span className={`badge-category badge-${g.category}`}>
            {g.category.toUpperCase()}
          </span>
          &nbsp;{g.title}
        </span>
      ))}
    </div>
  </div>

  {/* EVENTS */}
  <h3 className="section-title">Events & Highlights</h3>
  <div className="event-grid mb-5">
    {images.map(img => (
      <div
        className="event-card"
        key={img._id}
        onClick={() => openImageModal(img.imageUrl)}
      >
        <img src={img.imageUrl} className="event-img" alt={img.title} />
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

  {/* DOCUMENTS */}
  <h3 className="section-title">Important Documents</h3>
  <div className="doc-list">
    {pdfs.map(p => (
      <div className="doc-item" key={p._id}>
        <span className="doc-title">📄 {p.title}</span>
        <a href={p.pdfUrl} target="_blank" download>Download ⬇</a>
      </div>
    ))}
  </div>

</div>

  );
};

export default Announcement;
