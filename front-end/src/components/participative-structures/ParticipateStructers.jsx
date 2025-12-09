import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "../../Style/ParticipateStructers.css"; // Ensure you have this CSS file
import { useTranslation } from "react-i18next"; // 🆕 Added

const ParticipateStructers = () => {
  const { t } = useTranslation(); // 🆕 Added
  const stats = [
    { value: "3", label: t("apostolic_societies"), path: "/one" },
    { value: "8", label: t("formation_groups"), path: "/two" },
    { value: "4", label: t("service_organizations"), path: "/three" },
    { value: "3", label: t("worship_organizations"), path: "/four" },
    // { value: "3", label: "நிறைவு அமைப்புகள்", path: "/five" }
  ];

  return ( 
    <>
      <h1 className="section-title mt-5">{t("participatory_structures_title")}</h1>
      <div className="container text-center my-5">
        <div className="row justify-content-center mt-5">
          {stats.map((stat, index) => (
            <div key={index} className="col-lg-3 col-md-6 col-sm-6 col-12 mb-4">
              <div className="stat-box">
                <h2 className="stat-value">{stat.value}</h2>
                <p className="stat-label">{stat.label}</p>
                <Link to={stat.path} className="read-more-btn">
                  {t("view_more")}
                  </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ParticipateStructers;
