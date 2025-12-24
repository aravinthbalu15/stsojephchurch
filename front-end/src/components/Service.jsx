import React from "react";
import { useNavigate } from "react-router-dom";
import "../Style/Service.css";
import { useTranslation } from "react-i18next";

import Image1 from "../images/service/1.png";
import Image2 from "../images/service/2.png";
import Image3 from "../images/service/3.png";
import Image4 from "../images/service/4.png";
import Image5 from "../images/service/5.png";
import Image6 from "../images/service/6.png";
import Image7 from "../images/service/7.png";

const Service = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const persons = [
    { img: Image7, key: "person1" },
    { img: Image1, key: "person2" },
    { img: Image2, key: "person3" },
    { img: Image3, key: "person4" },
    { img: Image4, key: "person5" },
    { img: Image5, key: "person6" },
    { img: Image6, key: "person7" }
  ];

  return (
    <div className="service-container mt-5">
      <h1 className="text-center mt-5">{t("Our_people_at_Gods_Service")}</h1>

      {persons.map((p) => (
        <div className="row align-items-center my-5" key={p.key}>
          <div className="col-md-4 text-center">
            <img src={p.img} alt="" className="img-fluid profile-image" />
          </div>

          <div className="col-md-8">
            <p className="text-center"><strong></strong> {t(`${p.key}_name`)}</p>
            {/* <p><strong>{t("Date_of_Birth")}:</strong> {t(`${p.key}_dob`)}</p> */}
            {/* <p><strong>{t("Place_of_Birth")}:</strong> {t(`${p.key}_birthplace`)}</p>
            <p><strong>{t("Date_of_Ordination")}:</strong> {t(`${p.key}_ordination`)}</p>
            <p><strong>{t("Ministering_At")}:</strong> {t(`${p.key}_ministry`)}</p> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Service;
