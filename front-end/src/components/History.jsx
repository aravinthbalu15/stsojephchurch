import React from "react";
import { useNavigate } from "react-router-dom";
import "../Style/History.css"; // Bootstrap not needed here
import Image1 from "../images/image4.png";

const History = () => {
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
          <h2 className="history-heading">A Journey of Faith: Our Church’s Legacy</h2>
          <p className="history-text">
            Kamplar has a long history of adherence to Christian faith, mercifully led by God through waves of dramatic events,
            led by great parish priests and committed Catholic persons. The stone-cut Cross which has been venerated at Devandivilai,
            at the heart of Kamplar parish, whose style is ascribed to the times of St. Thomas the Apostle, is a certain witness to
            show that Christianity had gained foothold at Kamplar...
          </p>
          <p className="history-view-more" onClick={handleViewMore}>View More →</p>
        </div>
      </div>
    </div>
  );
};

export default History;
