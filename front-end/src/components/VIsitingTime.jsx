import React, { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import { useTranslation } from "react-i18next";

import "bootstrap/dist/css/bootstrap.min.css";
import "../Style/VisitingTime.css";

const VisitingTime = () => {
    const { t } = useTranslation();
  
  const [expanded, setExpanded] = useState(false);
  const [visitingTime, setVisitingTime] = useState(null);

  const fetchVisitingTime = async () => {
    try {
      const res = await axios.get("http://localhost:9000/api/visiting-time");
      setVisitingTime(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchVisitingTime();
  }, []);

  if (!visitingTime) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <div className="container d-flex justify-content-center mt-5">
      <motion.div
        className="church-card p-4 shadow-lg rounded-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="d-flex align-items-center">
          <motion.div
            className="church-icon-wrapper"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <Clock size={40} strokeWidth={2} />
          </motion.div>

          <div className="ms-4">
            <h4 className="fw-bold text-primary">{t("vt_time")}</h4>
            <p className="text-muted">{t("vt_desc")}</p>

            <h5 className="text-success">{t("vt_re")}</h5>
            <p>{t("vt_mon_sun")}: {visitingTime.regularDays.mondayToFriday}</p>
            <p>{t("vt_sa")}: {visitingTime.regularDays.saturday}</p>
            <p>{t("vt_su")}: {visitingTime.regularDays.sunday}</p>

            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={expanded ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="church-content-hidden"
            >
              <h5 className="text-warning">{t("vt_mass")}</h5>
              <p>{t("vt_week")}:</p>
              <ul>
                {visitingTime.massTimings.weekdays.map((time, index) => (
                  <li key={`${time}-${index}`}>{time}</li>
                ))}
              </ul>

              <p>{t("vt_sun_mass")}:</p>
              <ul>
                {visitingTime.massTimings.sunday.map((time, index) => (
                  <li key={`${time}-${index}`}>{time}</li>
                ))}
              </ul>
            </motion.div>

            <motion.button
              className="btn btn-link text-decoration-none text-primary fw-bold p-0 mt-2"
              onClick={() => setExpanded(!expanded)}
              whileHover={{ scale: 1.1 }}
            >
              {expanded ? "Show Less" : "Show More"}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default VisitingTime;
