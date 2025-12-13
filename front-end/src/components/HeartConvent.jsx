import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useTranslation } from "react-i18next";
import Image1 from "../images/heart-convent/1.png";
import "../Style/HeartConvent.css";

const HeartConvent = () => {
  const { t, i18n } = useTranslation();
  const [dynamicImages, setDynamicImages] = useState([]);

  // 🌐 Language resolver
  const lang = i18n.language === "ta" ? "ta" : "en";

  /* ================= SCROLL REVEAL ================= */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".scroll-reveal");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  /* ================= FETCH IMAGES ================= */
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/heartconvent`
        );
        // ✅ Already ordered from backend
        setDynamicImages(res.data);
      } catch (err) {
        console.error("Error fetching images:", err);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="heart-convent container">
      {/* ================= TITLE ================= */}
      <h2 className="text-center mb-5 section-title scroll-reveal">
        {t("heart_convent")}
      </h2>

      {/* ================= MAIN IMAGE ================= */}
      <div className="row mb-5 scroll-reveal">
        <div className="col text-center">
          <img
            src={Image1}
            alt="Heart Convent"
            className="img-fluid main-image shadow-lg"
          />
        </div>
      </div>

      {/* ================= DESCRIPTION ================= */}
      <div className="row mb-5 scroll-reveal">
        <div className="col-md-10 offset-md-1 p-4 description">
          <p className="fs-5 text-center mb-0">
            {t("heart_con_desc")}
          </p>
        </div>
      </div>

      {/* ================= GALLERY ================= */}
      <div className="row justify-content-center scroll-reveal">
        {dynamicImages.map((img) => (
          <div
            key={img._id}
            className="col-sm-6 col-md-4 mb-4 d-flex flex-column align-items-center text-center"
          >
            <img
              src={img.imageUrl}
              alt={img.name?.[lang]}
              className="img-fluid rounded-circle shadow gallery2-img"
            />

            <h1 className="gallery-title1 mt-3">
              {img.name?.[lang]}
            </h1>

            <p className="gallery-description">
              {img.description?.[lang]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeartConvent;
