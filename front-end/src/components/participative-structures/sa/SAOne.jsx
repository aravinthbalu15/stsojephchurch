import React from "react";
import Image1 from "./SAOne.png";
import { useTranslation } from "react-i18next";
// import "./VAOne.css";

const VAOne = () => {
  const { t } = useTranslation();

  return (
    <div className=" parti_pa_page">
      {/* Title */}
      <h1 className="parti_pa_title  mt-5">
        {t("women_selfhelp")}
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
        <h3 className="parti_pa_subtitle">
          {t("worship_goal_title")}
        </h3>

        {/* <p className="parti_pa_quote">
          "{t("worship_goal_quote")}"
        </p> */}

        <p className="parti_pa_text">
          {t("SAone.desc")}
        </p>

        <h3 className="parti_pa_subtitle mt-4">
          {t("worship_origin_title")}
        </h3>

        <p className="parti_pa_text">
          {t("SAone.desc1")}
        </p>

        {/* <p className="parti_pa_text">
          {t("worship_origin_desc2")}
        </p> */}

        {/* <p className="parti_pa_text">
          {t("worship_origin_desc3")}
        </p> */}
      </div>
    </div>
  );
};

export default VAOne;
