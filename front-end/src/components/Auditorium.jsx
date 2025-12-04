import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Style/Auditorium.css";
import Image1 from "../images/Auditorium/1.png";
import { useTranslation } from "react-i18next"; // 🆕 Added

const Auditorium = () => {
   const { t } = useTranslation(); // 🆕 Added
  const navigate = useNavigate();

  return (
    <div className="ac-container">
      <div className="row align-items-center ac-content-wrapper">

        {/* Image Section – Always on left for desktop, second on mobile */}
        <div className="col-md-6 order-2 order-md-1 ac-img-col">
          <div className="ac-image-container">
            <img 
              src={Image1} 
              alt="Church History" 
              className="ac-main-img img-fluid" 
            />
            <div className="ac-img-overlay"></div>
          </div>
        </div>

        {/* Text Section – Heading + Description */}
        <div className="col-md-6 order-3 order-md-2 ac-text-col">
          <h2 className="ac-main-heading text-md-start text-center mb-4">
            <span className="ac-heading-gradient">{t("auditorium_title")}</span>
          </h2>

          <p className="ac-description">{t("auditorium_description")}</p>
        </div>

      </div>
    </div>
  );
};

export default Auditorium;
