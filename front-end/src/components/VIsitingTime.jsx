import React, { useState } from "react";
import { Clock } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion } from "framer-motion";
import "../Style/VisitingTime.css";

const VisitingTime = () => {
  const [expanded, setExpanded] = useState(false);

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
            <h4 className="fw-bold text-primary">Visiting Hours</h4>
            <p className="text-muted">Experience peace and serenity at our church.</p>

            <h5 className="text-success">⏰ Regular Days</h5>
            <p>Monday to Friday: 9:00 AM – 5:00 PM</p>
            <p>Saturday: 9:00 AM – 1:00 PM</p>
            <p>Sunday: 6:00 AM – 8:00 PM</p>

            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={expanded ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="church-content-hidden"
            >
              <h5 className="text-warning">🙏 Mass Timings</h5>
              <p>Weekdays:</p>
              <ul>
                <li>Morning Mass: 6:30 AM</li>
                <li>Noon Mass: 12:00 PM</li>
              </ul>
              <p>Sunday Mass:</p>
              <ul>
                <li>8:30 AM - 10:30 AM</li>
                {/* <li>Second Mass: 8:00 AM</li> */}
                {/* <li>Third Mass: 10:30 AM</li> */}
              </ul>

              {/* <h5 className="text-danger">🌟 Special Services</h5> */}
              {/* <ul> */}
                {/* <li>Confession: Saturday | 5:00 PM – 6:00 PM</li> */}
                {/* <li>Adoration: First Friday | 7:00 PM – 8:30 PM</li> */}
                {/* <li>Baptisms: Sunday | 11:30 AM (By Appointment)</li> */}
                {/* <li>Weddings: As per Church Schedule</li> */}
              {/* </ul> */}

              {/* <h5 className="text-info">🕒 Office Hours</h5>
              <p>Monday to Friday: 9:00 AM – 5:00 PM</p>
              <p>Saturday: 9:00 AM – 1:00 PM</p> */}
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
