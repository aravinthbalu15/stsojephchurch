import React from "react";
import { useNavigate } from "react-router-dom";
import "../Style/History.css"; // Bootstrap not needed here
import Image1 from "../images/image4.png";
import { useTranslation } from "react-i18next";
const History = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleViewMore = () => {
    navigate("/history-details");
  };

  return (
    <div className="history-section">
      <div className="history-content-wrapper">
        {/* Image Block */}
        <div className="history-image-wrapper">
          <img src={Image1} alt="Church History" className="history-image" />
        </div>

        {/* Text Block */}
        <div className="history-text-wrapper">
          <h2 className="history-heading">{t("Home_history_title")}</h2>
          <p className="history-text">{t("Home_history_description")}<p className="history-view-moreee" onClick={handleViewMore}>{t("read_more")}</p></p>
          
        </div>
      </div>
    </div>
  );
};

export default History;
