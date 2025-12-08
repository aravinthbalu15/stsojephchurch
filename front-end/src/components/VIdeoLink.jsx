import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Style/VideoLink.css";
import { useTranslation } from "react-i18next";

const VideoLink = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [videos, setVideos] = useState([]);

  const fetchVideos = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/videolink`);
      setVideos(res.data);
    } catch (err) {
      console.log("Error loading videos", err);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <Container className="video-section">
      <h2 className="section-title">{t("Our_Videos")}</h2>

      <div className="video-wrapper">
        <div className="marquee">
          <div className="marquee-track">
            {(videos.concat(videos)).map((video, index) => (
              <div key={index} className="video-item">
                <video controls>
                  <source src={video.videoUrl} type="video/mp4" />
                </video>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button className="read-more-btn" onClick={() => navigate("/videos")}>
        {t("view_more")}
      </button>
    </Container>
  );
};

export default VideoLink;
