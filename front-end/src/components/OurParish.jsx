import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Style/OurParish.css";
import { useTranslation } from "react-i18next";

const OurParish = () => {
  const { t, i18n } = useTranslation();

  // 🌐 Language resolver
  const lang = i18n.language === "ta" ? "ta" : "en";

  const [head, setHead] = useState([]);
  const [subhead, setSubhead] = useState([]);
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/parish`
        );

        const data = res.data;

        // ✅ Category-wise (order already handled in backend)
        setHead(data.filter((m) => m.category === "head"));
        setSubhead(data.filter((m) => m.category === "subhead"));
        setMembers(data.filter((m) => m.category === "member"));
      } catch (err) {
        console.error("Error fetching parish data:", err);
      }
    };

    fetchMembers();
  }, []);

  return (
    <div>
      {/* ================= HEAD ================= */}
      <div className="parish-container mt-5">
        <h2 className="parish-title mt-5">
          {t("parish_head")}
        </h2>

        <div className="parish-members-list">
          {head.map((m) => (
            <div
              key={m._id}
              className="parish-member-card"
              onClick={() => setSelectedMember(m)}
            >
              <img
                src={m.imageUrl}
                alt={m.name?.[lang]}
                className="parish-member-image"
              />
              <h3 className="parish-member-name">
                {m.name?.[lang]}
              </h3>
              <p>{m.description?.[lang]}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ================= SUBHEAD ================= */}
      <div className="parish-container">
        <h2 className="parish-title">
          {t("parish_subhead")}
        </h2>

        <div className="parish-members-list">
          {subhead.map((m) => (
            <div
              key={m._id}
              className="parish-member-card"
              onClick={() => setSelectedMember(m)}
            >
              <img
                src={m.imageUrl}
                alt={m.name?.[lang]}
                className="parish-member-image"
              />
              <h3 className="parish-member-name">
                {m.name?.[lang]}
              </h3>
              <p>{m.description?.[lang]}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ================= MEMBERS ================= */}
      <div className="parish-container mb-5">
        <h2 className="parish-title">
          {t("parish_members")}
        </h2>

        <div className="parish-council-list">
          {members.map((m) => (
            <div
              key={m._id}
              className="parish-member-card"
              onClick={() => setSelectedMember(m)}
            >
              <img
                src={m.imageUrl}
                alt={m.name?.[lang]}
                className="parish-member-image"
              />
              <h3 className="parish-member-name">
                {m.name?.[lang]}
              </h3>
              <p>{m.description?.[lang]}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ================= POPUP ================= */}
      {selectedMember && (
        <div
          className="parish-popup-overlay"
          onClick={() => setSelectedMember(null)}
        >
          <div
            className="parish-popup-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedMember.imageUrl}
              alt={selectedMember.name?.[lang]}
              className="parish-popup-image"
            />
            <h2>{selectedMember.name?.[lang]}</h2>
            <p>{selectedMember.description?.[lang]}</p>

            <button
              className="parish-close-btn"
              onClick={() => setSelectedMember(null)}
            >
              {t("close")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OurParish;
