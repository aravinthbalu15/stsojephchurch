import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import axios from "axios";
import "../Style/ImageLink.css";
import { useTranslation } from "react-i18next";

const ImageLink = () => {
  const { t } = useTranslation();
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/imglink`)
      .then(res => setImages(res.data))
      .catch(err => console.error("Error fetching images:", err));
  }, []);

  return (
    <Container className="image-section">
      <h2 className="section-title">{t("Our_Gallery")}</h2>

      <div className="image-container">
        <div className="image-track">
          {(images.concat(images).concat(images)).map((image, index) => (
            <div key={index} className="image-item">
              <img src={image.imageUrl} alt={image.title} className="gallery-image" />
            </div>
          ))}
        </div>
      </div>

      <Button
        className="read-more-btn"
        onClick={() => (window.location.href = "/images-category")}
      >
        {t("view_more")}
      </Button>
    </Container>
  );
};

export default ImageLink;
