import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Style/OurParish.css";

const OurParish = () => {
  const [head, setHead] = useState([]);
  const [subhead, setSubhead] = useState([]);
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/parish`);
        const data = res.data;
        setHead(data.filter((item) => item.category === "head"));
        setSubhead(data.filter((item) => item.category === "subhead"));
        setMembers(data.filter((item) => item.category === "member"));
      } catch (err) {
        console.error("Error fetching parish data:", err);
      }
    };
    fetchMembers();
  }, []);

  return (
    <div>
      {/* Head Section */}
      <div className="parish-container mt-5">
        <h2 className="parish-title mt-5">Parish Priest</h2>
        <div className="parish-members-list">
          {head.map((member) => (
            <div key={member._id} className="parish-member-card" onClick={() => setSelectedMember(member)}>
              <img src={member.imageUrl} alt={member.name} className="parish-member-image" />
              <h3 className="parish-member-name">{member.name}</h3>
              <p>{member.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Subhead Section */}
      <div className="parish-container">
        <h2 className="parish-title">Key Members</h2>
        <div className="parish-members-list">
          {subhead.map((member) => (
            <div key={member._id} className="parish-member-card" onClick={() => setSelectedMember(member)}>
              <img src={member.imageUrl} alt={member.name} className="parish-member-image" />
              <h3 className="parish-member-name">{member.name}</h3>
              <p>{member.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Council Members Section */}
      <div className="parish-container mb-5">
        <h2 className="parish-title">Parish Council Members</h2>
        <div className="parish-council-list">
          {members.map((member) => (
            <div key={member._id} className="parish-member-card" onClick={() => setSelectedMember(member)}>
              <img src={member.imageUrl} alt={member.name} className="parish-member-image" />
              <h3 className="parish-member-name">{member.name}</h3>
              <p>{member.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Popup */}
      {selectedMember && (
        <div className="parish-popup-overlay" onClick={() => setSelectedMember(null)}>
          <div className="parish-popup-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedMember.imageUrl} alt={selectedMember.name} className="parish-popup-image" />
            <h2>{selectedMember.name}</h2>
            <p>{selectedMember.description}</p>
            <button className="parish-close-btn" onClick={() => setSelectedMember(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OurParish;
