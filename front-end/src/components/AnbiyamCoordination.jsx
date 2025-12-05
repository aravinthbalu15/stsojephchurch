import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Style/AnbiyamCoordination.css";
import { useTranslation } from "react-i18next";

const AnbiyamCoordination = () => {
  const { t } = useTranslation();
  const [members, setMembers] = useState([]);

  const fetchMembers = async () => {
    const res = await axios.get("http://localhost:9000/api/acmembers");
    setMembers(res.data);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <div className="anbiyam-co members-list12 mt-5">
    <h1 className="section-title text-center mb-4">{t("co_anbiyam")}</h1>

  {members.map((member) => (
    <div key={member._id} className="member-card">
      <img src={member.imageUrl} alt={member.name} className="member-image" />
      <h3 className="member-name">{member.name}</h3>
      <p className="member-description">{member.description}</p>
    </div>
  ))}
</div>

  );
};

export default AnbiyamCoordination;
