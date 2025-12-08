import React from "react";
import { useTranslation } from "react-i18next";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "../images/mission-vission/image.png";
import "../Style/VissionandMission.css";

const VissionandMission = () => {
  const { t } = useTranslation();

  return (
    <div className="mission">
      <div style={{ fontFamily: "Segoe UI, sans-serif", background: "#f9f9f9" }}>
        
        {/* Top Banner Image */}
        <div className="w-100 mt-4">
          <img
            src={Image}
            alt="Church Vision and Mission"
            className="img-fluid w-100"
            style={{ height: "500px", objectFit: "cover" }}
          />
        </div>

        <div className="container py-5">
          <div className="text-center mb-4">
            <h1 className="fw-bold" style={{ color: "#2c3e50" }}>
              {t("vm.motto_title")}
            </h1>
            <h4 className="fw-bold" style={{ color: "#2c3e50" }}>
              {t("vm.motto")}
            </h4>

            <p className="text-muted fst-italic">
              {/* {t("vm.motto_english")} */}
              {/* <br /> */}
              <span className="text-dark">{t("vm.vision_sub_title")}</span>
              <br />
              <span className="text-dark">{t("vm.vision_sub_desc")}</span>
            </p>
          </div>

          {/* Vision Section */}
          <div className="mb-4">
            <h3 className="text-primary fw-semibold">{t("vm.vision_title")}</h3>
            <p className="fs-5">{t("vm.vision_desc")}</p>
          </div>

          {/* Mission Section */}
          <div>
            <h3 className="text-primary fw-semibold">{t("vm.mission_title")}</h3>
            <ol className="fs-5">
              {t("vm.mission_points", { returnObjects: true }).map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VissionandMission;
