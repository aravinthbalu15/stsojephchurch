import React, { useEffect, useState } from 'react';
import axios from "axios";
import "../Style/Family.css";
import { useTranslation } from "react-i18next";

const Family = () => {
  const { t } = useTranslation();
  const [stats, setStats] = useState({ families: 0, anbiyams: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/family`);
      setStats(response.data);
    };
    fetchStats();
  }, []);

  return (
    <div className="container text-center my-5">
      <h1 className="section-title mt-5">{t("our_parish_community")}</h1>

      <div className="row justify-content-center mt-5">
        <div className="col-lg-3 col-md-6 col-sm-6 col-12 mb-4">
          <div className="stat-box">
            <h2 className="stat-value">{stats.families}</h2>
            <p className="stat-label">{t("families")}</p>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 col-sm-6 col-12 mb-4">
          <div className="stat-box">
            <h2 className="stat-value">{stats.anbiyams}</h2>
            <p className="stat-label">{t("anbiyams")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Family;
