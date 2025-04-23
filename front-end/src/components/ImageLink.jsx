import React from "react";
import { Container } from "react-bootstrap";
import "../Style/ImageLink.css";

// Import images
import Image1 from "../images/christmas/1.png";
import Image2 from "../images/christmas/2.png";
import Image3 from "../images/christmas/3.png";
import Image4 from "../images/christmas/4.png";

const images = [
  { id: 1, src: Image1, alt: "Church Event 1" },
  { id: 2, src: Image2, alt: "Church Event 2" },
  { id: 3, src: Image3, alt: "Church Event 3" },
  { id: 4, src: Image4, alt: "Church Event 4" },
];

const ImageLink = () => {
  return (
    <Container className="image-section mt-5">
      <h2 className="section-title">
        Our <span className="highlights">Gallery</span>
      </h2>

      <div className="gallery-wrapper">
        <div className="image-container">
          <div className="image-track">
            {images.concat(images).map((image, index) => ( // Duplicate images
              <div key={index} className="image-item">
                <img src={image.src} alt={image.alt} className="gallery-image" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <button className="view-more-btn" onClick={() => (window.location.href = "/images-category")}>
        View More
      </button>
    </Container>
  );
};

export default ImageLink;
