import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Style/AnbiyamCoordination.css";
import { useTranslation } from "react-i18next";

const AnbiyamCoordination = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language === "ta" ? "ta" : "en";
  const [members, setMembers] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/acmembers`)
      .then((res) => setMembers(res.data));
  }, []);

  return (
    <div className="anbiyam-co members-list12 mt-5">
      <h1 className="section-title text-center mb-4">
        {t("co_anbiyam")}
      </h1>

      {members.map((m) => (
        <div key={m._id} className="member-card">
          <img src={m.imageUrl} alt={m.name[lang]} className="member-image" />
          <h3 className="member-name">{m.name[lang]}</h3>
          <p className="member-description">{m.description[lang]}</p>
        </div>
      ))}
    </div>
  );
};

export default AnbiyamCoordination;
