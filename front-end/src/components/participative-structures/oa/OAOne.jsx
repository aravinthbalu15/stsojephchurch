import React from "react";
import Image1 from "./OAOne.png";
import { useTranslation } from "react-i18next";
// import "./OATwo.css";

const VAOne = () => {
  const { t } = useTranslation();

  return (
    <div className=" parti_pa_page">
      {/* Title */}
      <h1 className="parti_pa_title  mt-5">
        {t("balarsabha")}
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
          {t("OAone.title")}
        </h3>

        {/* <p className="parti_pa_quote">
          "{t("OAfour.quote")}"
        </p> */}

        <p className="parti_pa_text">
          {t("OAone.desc")}
        </p>

        <h3 className="parti_pa_subtitle mt-4">
          {t("worship_origin_title")}
        </h3>

        <p className="parti_pa_text">
          {t("OAone.desc1")}
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
