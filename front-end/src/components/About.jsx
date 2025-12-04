import React from "react";
import "../Style/About.css";
import { Container, Row, Col } from "react-bootstrap";
import Image4 from "../images/Auditorium/2.png";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();

  return (
    <Container className="anbiyangal-container mt-5">
      <h1 className="section-title">{t("about_title")}</h1>

      <Row className="justify-content-center text-center">
        <Col md={6}>
          <div className="image-container"><br />
            <img src={Image4} alt="Church History" className="rect-img-about img-fluid" /><br />
          </div>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={10}>
          <p className="full-width-text">
            {t("about_para1")}<br/><br/>
            {t("about_para2")}<br/><br/>
            {t("about_para3")}<br/><br/>
            {t("about_para4")}<br/><br/>
            {t("about_para5")}
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
