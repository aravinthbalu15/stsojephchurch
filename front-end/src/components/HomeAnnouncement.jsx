import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import "bootstrap/dist/css/bootstrap.min.css";

const Announcement = () => {
  const { t } = useTranslation();
  const [announcements, setAnnouncements] = useState([]);

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

  const general = announcements.filter(
    (a) => !a.imageUrl && !a.pdfUrl
  );

  // ✅ If admin didn't upload anything → show nothing
  if (general.length === 0) {
    return null;
  }

  return (
    <div className="container mb-5 ann-viewrs">
      <div className="card shadow-lg border-0">
        <div className="card-body p-0">
          <div className="announce-ticker">
            <div className="ticker-track">
              {general.map((g) => (
                <span key={g._id} className="ticker-item">
                  <span className="ann-text">{g.title}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Announcement;
