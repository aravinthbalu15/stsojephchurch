import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Style/Auditorium.css";
import Image1 from "../images/Auditorium/1.png";

const Auditorium = () => {
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
            <span className="ac-heading-gradient">St. Joseph's Auditorium</span>
          </h2>

          <p className="ac-description">
            Valanar Arangam (St. Joseph's Auditorium) – The old church, now known as Valanar Arangam, has been serving as a meeting hall for pastoral activities and as a function hall for the people since 2015. This strong stone-built structure, rich in tradition, has been carefully renovated and preserved to honor its heritage.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Auditorium;
