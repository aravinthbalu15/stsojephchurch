import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SubstationImage from "../images/Auditorium/3.png"; // Adjust path as needed
import '../Style/Substation.css'
const Substation = () => {
  return (
    <div className="container substation">
      <h1 className="text-center mb-4 mt-5">Our Lady of Loreto Church, Tholayavattam</h1>

      <div className="row justify-content-center">
        <div className="col-md-10">
          <img 
            src={SubstationImage} 
            alt="Substation" 
            className="substation-img mt-2 " 
          />
        </div>
      </div>
    </div>
  );
};

export default Substation;
