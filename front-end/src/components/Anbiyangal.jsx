import React, { useEffect, useState } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import "../Style/Anbiyangal.css";
import { Container, Row, Col } from "react-bootstrap";

const API_URL = "http://localhost:9000/api/anbiyam";

const Anbiyangal = () => {
  const [groups, setGroups] = useState([]);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    fetchGroups();

    const handleScroll = () => {
      if (window.scrollY > 300) setShowButton(true);
      else setShowButton(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fetchGroups = async () => {
    try {
      const res = await axios.get(API_URL);
      setGroups(res.data);
    } catch (error) {
      console.error("Error loading Anbiyam:", error);
    }
  };

  return (
    <>
      {groups.map((group, idx) => (
        <Container key={group._id} className="anbiyangal-container mt-5 mb-5" data-aos="fade-up">

          <h1 className="section-title" data-aos="fade-down">அன்பியம் - {group.groupNumber}</h1>
          <p className="section-subtitle text-center" data-aos="fade-down">{group.groupTitle}</p>

          <div className="title-divider"></div>

          <div className="inner-wrapper">
            <Row className="align-items-center">

              {/* RIGHT SIDE MAIN IMAGE FIRST ON MOBILE */}
              <Col
                md={6}
                className="d-flex flex-column align-items-start text-left right-side order-1 order-md-2"
                data-aos="fade-left"
              >
                <img src={group.mainImageUrl} alt="Main" className="rectss-img" />
                <h1 className="rect-title">{group.mainTitle}</h1>
                <p className="rect-desc">{group.mainDescription}</p>
              </Col>

              {/* LEFT SIDE MEMBERS */}
              <Col
                md={6}
                className="d-flex flex-column align-items-start gap-4 left-side order-2 order-md-1"
                data-aos="fade-right"
              >
                {group.members.map((m, memberIndex) => (
                  <div
                    className="image-box d-flex align-items-center"
                    key={memberIndex}
                    data-aos="fade-right"
                    data-aos-delay={memberIndex * 150}
                  >
                    <img src={m.imageUrl} alt={m.name} className="circle-img" />
                    <div className="text-content">
                      <h1 className="image-title">{m.role}</h1>
                      <p className="image-desc">{m.name}</p>
                      <p className="image-desc">{m.description}</p>
                    </div>
                  </div>
                ))}
              </Col>
            </Row>
          </div>
        </Container>
      ))}

      {/* SCROLL TO TOP BUTTON */}
      {showButton && (
        <div className="scroll-up" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          ↑
        </div>
      )}
    </>
  );
};

export default Anbiyangal;
