import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Style/OldPriest.css";
import { useTranslation } from "react-i18next";

const OldPriest = () => {
  const { t } = useTranslation();
  const [priests, setPriests] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  useEffect(() => {
    const fetchPriests = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/oldpriests`);
        setPriests(res.data);
      } catch (error) {
        console.error("Error fetching priests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPriests();
  }, []);

  return (
    <div className="our-parish-containers mt-5">
      <h2 className="section-title mt-5">{t("our_pariest")}</h2>

      {loading ? (
        <p className="loading-text">Loading...</p>
      ) : priests.length === 0 ? (
        <p className="loading-text">No data available.</p>
      ) : (
        <div className="members-list mt-5">
          {priests.map((member) => (
            <div key={member._id} className="member-row">
              <img src={member.imageUrl} alt={member.name} className="member-image" />
              <h3 className="member-name">{member.name}</h3>
              <p className="member-info">
                {formatDate(member.dob_start)} to {formatDate(member.dob_end)}
              </p>
            </div>
          ))}
        </div>
      )}

      <br /><br />
    </div>
  );
};

export default OldPriest;
