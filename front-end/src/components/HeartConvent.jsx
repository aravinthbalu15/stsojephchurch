import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useTranslation } from "react-i18next";
import Image1 from "../images/heart-convent/1.png";
import '../Style/HeartConvent.css';

const HeartConvent = () => {
  const { t } = useTranslation();
  const [dynamicImages, setDynamicImages] = useState([]);

  // Scroll Reveal Animation
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Fetch Gallery images
  useEffect(() => {
    axios.get('http://localhost:9000/api/heartconvent')
      .then(res => setDynamicImages(res.data))
      .catch(err => console.error("Error fetching images:", err));
  }, []);

  return (
    <div className="heart-convent container">
      <h2 className="text-center mb-5 section-title scroll-reveal">{t("heart_convent")}</h2>

      {/* Main Image */}
      <div className="row mb-5 scroll-reveal">
        <div className="col text-center">
          <img src={Image1} alt="Convent" className="img-fluid main-image shadow-lg" />
        </div>
      </div>

      {/* Description */}
      <div className="row mb-5 scroll-reveal">
        <div className="col-md-10 offset-md-1 p-4 description">
          <p className="fs-5 text-center mb-0">{t("heart_con_desc")} </p>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="row justify-content-center scroll-reveal">
        {dynamicImages.map((img, index) => (
          <div
            key={img._id || index}
            className="col-sm-6 col-md-4 mb-4 d-flex flex-column align-items-center text-center"
          >
            <img
              src={img.imageUrl}
              alt={img.name}
              className="img-fluid rounded-circle shadow gallery2-img"
            />

            <h1 className="gallery-title1 mt-3">{img.name}</h1>

            {/* ⭐ Fixed Description */}
            <p className="gallery-description">
              {img.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeartConvent;
