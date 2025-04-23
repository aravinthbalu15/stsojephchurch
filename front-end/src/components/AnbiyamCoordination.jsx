import React from 'react'
import Image1 from "../images/all-soul/1.png";
import Image2 from "../images/all-soul/2.png";
import Image3 from "../images/all-soul/3.png";
import Image4 from "../images/all-soul/image.png"; // Rectangular Image
import Image5 from "../images/jenish.jpeg";
import "../Style/AnbiyamCoordination.css"
const members = [
    { id: 1, name: "Priest (President)", dob: "Jan 1, 1980", original: "Fr. Maria William", img: Image1,p:"this is the description for the image" },
    { id: 2, name: "Vice-President", dob: "Feb 15, 1985", original: "Mr. Richard Joseph Raj", img: Image2,p:"this is the description for the image" },
    { id: 3, name: "Secretary", dob: "Mar 22, 1990", original: "Mrs. Jacqulin", img: Image3,p:"this is the description for the image" },
    { id: 1, name: "Treasurer", dob: "Jan 1, 1980", original: "Mrs. Charlet Rani", img: Image4,p:"this is the description for the image" },
    { id: 2, name: "Co-Secretary", dob: "Feb 15, 1985", original: "Mr. Jenish", img: Image5,p:"this is the description for the image" },
  ];

const AnbiyamCoordination = props => {
  return (
    <div className='anbiyam-co'>
        <h1 className="section-title">Co-Ordination of Anbiyam</h1>

<div className="members-list12 mt-5">
          {members.map((member) => (
            <div key={member.id} className="member-row" onClick={() => setSelectedMember(member)}>
              <img src={member.img} alt={member.name} className="member-image" />
              <h3 className="member-name">{member.name}</h3>
              <p>{member.p}</p>
            </div>
          ))}
        </div> 
    </div>
  )
}

AnbiyamCoordination.propTypes = {}

export default AnbiyamCoordination