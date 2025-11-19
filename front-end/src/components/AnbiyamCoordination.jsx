import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Style/AnbiyamCoordination.css";

const AnbiyamCoordination = () => {
  const [members, setMembers] = useState([]);

  const fetchMembers = async () => {
    const res = await axios.get("http://localhost:9000/api/acmembers");
    setMembers(res.data);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <div className="anbiyam-co">
      <h1 className="section-title text-center mb-4">Co-Ordination of Anbiyam</h1>
      <div className="members-list12 mt-5">
        {members.map((member) => (
          <div key={member._id} className="member-row">
            <img src={member.imageUrl} alt={member.name} className="member-image" />
            <h3 className="member-name">{member.name}</h3>
            <p>{member.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnbiyamCoordination;
