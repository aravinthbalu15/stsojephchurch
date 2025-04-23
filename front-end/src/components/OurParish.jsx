import React, { useState } from "react";
import "../Style/OurParish.css";

// Importing images
import Image1 from "../images/aju.jpeg";
import Image2 from "../images/appu.jpeg";
import Image3 from "../images/ashik.jpeg";
import Image4 from "../images/rani.jpeg";
import Image5 from "../images/jenish.jpeg";

// Importing images for council members
import Maria from "../images/council/2.png";
import Shaji from "../images/council/shaji.png";
import Jeniba from "../images/council/jeniba.png";
import Ashwin from "../images/council/ashwin.png";
import Gladis from "../images/council/gladislily.png";
import Jerin from "../images/council/jerin.png";

const members = [
  { id: 1, name: "Rev.Fr. Maria William", original: "Rev.Fr. Maria William", img: Image1, p: "Parish Priest and President" },
];

const member1 = [
  { id: 2, name: "Mr. Richard Joseph Raj", original: "Mr. Richard Joseph Raj", img: Image2, p: "Vice President" },
  { id: 3, name: "Mrs. Jacqueline", original: "Mrs. Jacqulin", img: Image3, p: "Secretary" },
  { id: 4, name: "Mrs. Charlet Rani", original: "Mrs. Charlet Rani", img: Image4, p: "Treasur" },
  { id: 5, name: "Mr.M. Jenish", original: "Mr. Jenish", img: Image5, p: "Co-Secretary" },
];

const council = [
  { id: 6, name: " Dr. Gladis Lily", original: "Mrs. Gladis Lily", img: Gladis, p: "Member" },
  { id: 7, name: "Mrs.S.Maria Selvam", original: "Mrs.S.Maria Selvam", img: Maria, p: "Member" },


  { id: 8, name: "Mr. Shaji", original: "Mr. Shaji", img: Shaji, p: "Member" },
  { id: 9, name: "Miss. Jeniba", original: "Miss. Jeniba", img: Jeniba, p: "Member" },
  { id: 11, name: "Mr. Jerin", original: "Mr. Jerin", img: Jerin, p: "Member" },
  { id: 10, name: "Mr. Ashwin A", original: "Mr. Ashwin A", img: Ashwin, p: "Member" },

];

const OurParish = () => {
  const [selectedMember, setSelectedMember] = useState(null);

  return (
    <div>
      {/* Parish Members */}
      <div className="parish-container mt-5">
        <h2 className="parish-title mt-5">Meet Our Parish Council</h2>
        
        <div className="parish-members-list">
          {members.map((member) => (
            <div key={member.id} className="parish-member-card" onClick={() => setSelectedMember(member)}>
              <img src={member.img} alt={member.name} className="parish-member-image" />
              <h3 className="parish-member-name">{member.name}</h3>
              <p>{member.p}</p>
            </div>
          ))}
        </div> 

        {/* Second Row */}
        <div className="parish-members-list">
          {member1.map((member) => (
            <div key={member.id} className="parish-member-card" onClick={() => setSelectedMember(member)}>
              <img src={member.img} alt={member.name} className="parish-member-image" />
              <h3 className="parish-member-name">{member.name}</h3>
              <p>{member.p}</p>
            </div>
          ))}
        </div>

        {/* Popup for Selected Member */}
        {selectedMember && (
          <div className="parish-popup-overlay mt-5" onClick={() => setSelectedMember(null)}>
            <div className="parish-popup-content" onClick={(e) => e.stopPropagation()}>
              <img src={selectedMember.img} alt={selectedMember.name} className="parish-popup-image" />
              <h2>{selectedMember.original}</h2>
              <button className="parish-close-btn" onClick={() => setSelectedMember(null)}>Close</button>
            </div>
          </div>
        )}
      </div> 

      {/* Council Members */}
      <div className="parish-container mb-5">
        <h2 className="parish-title">Parish Council Members</h2>
        
        <div className="parish-council-list">
          {council.map((councilMember) => (
            <div key={councilMember.id} className="parish-member-card" onClick={() => setSelectedMember(councilMember)}>
              <img src={councilMember.img} alt={councilMember.name} className="parish-member-image" />
              <h3 className="parish-member-name">{councilMember.name}</h3>
              <p>{councilMember.p}</p>
            </div>
          ))}
        </div> 
      </div>
    </div>
  );
};

export default OurParish;
