import React, { useEffect, useState } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import "../Style/President.css";
import PresidentSkeleton from "./PresidentSkeleton";
import { useTranslation } from "react-i18next";

const President = () => {
  const [data, setData] = useState(null);
  const { i18n } = useTranslation();   // ⭐ Detect selected language (en | ta)

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/president`)
      .then((res) => setData(res.data));

    AOS.init();
  }, []);

  if (!data) return <PresidentSkeleton />;

  const lang = i18n.language === "ta" ? "ta" : "en"; // ⭐ Choose EN or TA dynamically

  const items = [
    { role: "Head", ...data.head },
    { role: "Bishop", ...data.bishop },
    { role: "Parish Priest", ...data.parishPriest },
  ];

  return (
    <div className="container text-center">
      <div className="row justify-content-center">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="col-lg-4 col-md-6 d-flex justify-content-center"
            data-aos={idx % 2 ? "fade-left" : "fade-right"}
          >
            <div className="president-card">

              {/* IMAGE */}
              <img
                loading="lazy"
                src={item.imageUrl}
                alt={item.name?.[lang]}
                className="president-img"
              />

              {/* NAME */}
              <h1 className="president-name">
                {item.name?.[lang] || item.name?.en}
              </h1>

              {/* MULTIPLE DESCRIPTIONS (EN/TA) */}
              {item.description?.[lang] && (
                <p className="president-desc">{item.description[lang]}</p>
              )}

              {item.description1?.[lang] && (
                <p className="president-desc">{item.description1[lang]}</p>
              )}

              {item.description2?.[lang] && (
                <p className="president-desc">{item.description2[lang]}</p>
              )}

              {item.description3?.[lang] && (
                <p className="president-desc">{item.description3[lang]}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default President;
