import React from "react";
import Image1 from "./OAfour.png";
import { useTranslation } from "react-i18next";
// import "./VAOne.css";

const VAOne = () => {
  const { t } = useTranslation();

  return (
    <div className=" parti_pa_page">
      {/* Title */}
      <h1 className="parti_pa_title  mt-5 text-center">
        {t("youth_boys")}
      </h1>

      {/* Image */}
      <div className="parti_pa_image_wrapper">
        <img
          src={Image1}
          alt="Worship Team"
          className="parti_pa_image"
        />
      </div>

      {/* Content */}
      <div className="parti_pa_content_wrapper">
         <p className="parti_pa_quote">
          "{t("OAfour.quote")}"
        </p>
         
        <h3 className="parti_pa_subtitle">
          {t("worship_goal_title")}
        </h3>



        <p className="parti_pa_text">
          {t("OAfour.desc")}
        </p>
          <h3 className="parti_pa_subtitle">
          {t("OAfour.time")}
        </h3>
         <p className="parti_pa_text">
          {t("OAfour.desc_time")}
        </p>

        <h3 className="parti_pa_subtitle mt-4">
          {t("worship_origin_title")}
        </h3>

        <p className="parti_pa_text">
          {t("OAfour.desc1")}
        </p>

        <h3 className="parti_pa_subtitle">
          {t("OAfour.moment")}
        </h3>


        <p className="parti_pa_text">
          {t("OAfour.descs1")}
        </p>
         <p className="parti_pa_text">
          {t("OAfour.descs2")}
        </p>
         <p className="parti_pa_text">
          {t("OAfour.descs3")}
        </p>
         <p className="parti_pa_text">
          {t("OAfour.descs4")}
        </p>
         <p className="parti_pa_text">
          {t("OAfour.descs5")}
        </p>

        
      </div>
    </div>
  );
};

export default VAOne;
