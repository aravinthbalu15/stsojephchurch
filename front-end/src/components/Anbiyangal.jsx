import React, { useEffect, useState } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import "../Style/Anbiyangal.css";
import { Container, Row, Col } from "react-bootstrap";

const Anbiyangal = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    fetchGroups();

    const handleScroll = () => setShowButton(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fetchGroups = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/anbiyam`);
      setGroups(res.data);
    } catch (error) {
      console.error("Error loading Anbiyam:", error);
      setError("Failed to load Anbiyam Data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="loading-text">Loading...</p>;
  if (error) return <p className="loading-text">{error}</p>;

  return (
    <>
      {groups.map((group, idx) => (
        <Container key={group._id || idx} className="anbiyangal-container mt-5 mb-5" data-aos="fade-up">

          <h1 className="section-title" data-aos="fade-down">
            அன்பியம் - {group.groupNumber}
          </h1>

          <p className="section-subtitle text-center" data-aos="fade-down">
            {group.groupTitle}
          </p>

          <div className="title-divider"></div>

          <div className="inner-wrapper">
            <Row className="align-items-center">

              {/* MAIN IMAGE + DETAILS */}
              <Col
                md={6}
                className="d-flex flex-column align-items-start text-left right-side order-1 order-md-2"
                data-aos="fade-left"
              >
                <img
                  src={group.mainImageUrl || group.mainImage}
                  alt="Main"
                  className="rectss-img"
                />
                <h1 className="rect-title">{group.mainTitle}</h1>
                <p className="rect-desc">{group.mainDescription}</p>
              </Col>

              {/* MEMBERS SECTION */}
              <Col
                md={6}
                className="d-flex flex-column align-items-start gap-4 left-side order-2 order-md-1"
                data-aos="fade-right"
              >
                {group.members?.length > 0 ? (
                  group.members.map((m, memberIndex) => (
                    <div className="image-box d-flex align-items-center" key={memberIndex}>
                      <img
                        src={m.imageUrl || m.image}
                        alt={m.name}
                        className="circle-img"
                      />
                      <div className="text-content">
                        <h1 className="image-title">{m.role}</h1>
                        <p className="image-desc">{m.name}</p>
                        <p className="image-desc">{m.description}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="no-member-text">No members available</p>
                )}
              </Col>

            </Row>
          </div>
        </Container>
      ))}

      {/* SCROLL TO TOP BUTTON */}
      {showButton && (
        <div
          className="scroll-up"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          ↑
        </div>
      )}
    </>
  );
};

export default Anbiyangal;
