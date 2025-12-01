import React from "react";
import "../Style/President.css";

const PresidentSkeleton = () => {
  return (
    <div className="container text-center">
      <div className="row justify-content-center">
        {[1, 2, 3].map((i) => (
          <div key={i} className="col-lg-4 col-md-6 d-flex justify-content-center">
            <div className="president-card skeleton">
              <div className="skeleton-img"></div>
              <div className="skeleton-line title"></div>
              <div className="skeleton-line"></div>
              <div className="skeleton-line"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PresidentSkeleton;
