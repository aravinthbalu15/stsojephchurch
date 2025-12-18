import React, { useEffect, useState } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import "../Style/President.css";
import PresidentSkeleton from "./PresidentSkeleton";
import { useTranslation } from "react-i18next";

const President = () => {
  const [data, setData] = useState(null);
  const { i18n } = useTranslation();

  // ============================
  // FETCH DATA
  // ============================
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/president`)
      .then((res) => setData(res.data))
      .catch((err) => console.error("Fetch error:", err));

    AOS.init({ once: true });
  }, []);

  if (!data) return <PresidentSkeleton />;

  // Language selection
  const lang = i18n.language === "ta" ? "ta" : "en";
  const getText = (obj) => obj?.[lang] || obj?.en || "";

  // Prepare sections (filter empty ones)
  const items = [
    { role: "Head", ...data.head },
    { role: "Bishop", ...data.bishop },
    { role: "Parish Priest", ...data.parishPriest },
  ].filter((item) => getText(item.name)); // 🚀 hide empty sections

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
                src={item.image || "/placeholder.jpg"}   // ✅ safe fallback
                alt={getText(item.name)}
                className="president-img"
              />

              {/* NAME */}
              <h1 className="president-name">
                {getText(item.name)}
              </h1>

              {/* DESCRIPTIONS */}
              {item.description1?.en && (
                <p className="president-desc">{getText(item.description1)}</p>
              )}

              {item.description2?.en && (
                <p className="president-desc">{getText(item.description2)}</p>
              )}

              {item.description3?.en && (
                <p className="president-desc">{getText(item.description3)}</p>
              )}

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default President;
