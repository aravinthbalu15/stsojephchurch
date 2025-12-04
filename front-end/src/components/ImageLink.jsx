import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import axios from "axios";
import "../Style/ImageLink.css";
import { useTranslation } from "react-i18next"; // 🆕 Added

const ImageLink = () => {
    const { t } = useTranslation(); // 🆕 Added
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:9000/api/imglink")
      .then(res => setImages(res.data))
      .catch(err => console.error("Error fetching images:", err));
  }, []);

  return (
    <Container className="image-section mt-5">
      <h2 className="section-title ">{t("Our_Gallery")}</h2>

      <div className="gallery-wrapper">
        <div className="image-container">
          <div className="image-track">
            {images.concat(images).map((image, index) => (
              <div key={index} className="image-item">
                <img src={image.imageUrl} alt={image.title} className="gallery-image" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <Button className="view-more-btn" onClick={() => (window.location.href = "/images-category")}>
        View More
      </Button>
    </Container>
  );
};

export default ImageLink;
