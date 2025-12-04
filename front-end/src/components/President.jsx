import React, { useEffect, useState } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import "../Style/President.css";
import PresidentSkeleton from "./PresidentSkeleton";

const API_URL = "http://localhost:9000/api/president";

const President = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(API_URL).then((res) => setData(res.data));
    AOS.init();
  }, []);

  if (!data) return <PresidentSkeleton />;

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
              <img loading="lazy" src={item.imageUrl} alt={item.name} className="president-img" />

              {/* <h4 className="role-title mt-2">{item.role}</h4> */}
              <h1 className="president-name">{item.name}</h1>

              {item.description && <p className="president-name">{item.description}</p>}
              {item.description1 && <p className="president-name">{item.description1}</p>}
              {item.description2 && <p className="president-name">{item.description2}</p>}
              {item.description3 && <p className="president-name">{item.description3}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default President;
