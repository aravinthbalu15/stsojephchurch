import React from 'react';
import '../Style/HistoryDetails.css';
import { Container, Row, Col } from 'react-bootstrap';
import Image1 from "../images/History/1.png";
import Image2 from "../images/image1.png";
import Image3 from "../images/image4.png";
import Image4 from "../images/image7.png";

import { useTranslation } from "react-i18next"; // 🆕 Added



const HistoryDetails = () => {
   const { t } = useTranslation(); // 🆕 Added
  return (
    <Container className="anbiyangal-container mt-5">
      {/* Anbiyangal 1 */}
      <h1 className="section-title">{t("history_name")}</h1>
      <h3 className="section-subtitle text-center">{t("history_title")}</h3>
<br />
      <Row className="align-items-center">
  {/* Left Side - Image */}
  <Col md={6} className="text-center">
    <img src={Image1} alt="Church History" className="rect-img-HD3 img-fluid" />
  </Col>

  {/* Right Side - Text */}
  <Col md={6} className="right-side">
    <p className="history-text">{t("history_para1")}</p>
   </Col>
</Row>

<Row className="align-items-center">
  {/* Left Side - Text */}
  <Col md={6} className="left-side">
    <p className="history-text">{t("history_para2")}</p>
    </Col>

  {/* Right Side - Image */}
  <Col md={6} className="text-center">
    <img src={Image2} alt="Church History" className="rect-img-HD img-fluid" />
  </Col>
</Row>
<Row className="align-items-center">
  {/* Left Side - Image */}
  <Col md={6} className="text-center">
    <img src={Image4} alt="Church History" className="rect-img-HD31 img-fluid"/>
  </Col>

  {/* Right Side - Text */}
  <Col md={6} className="right-side">
    <p className="history-text">{t("history_para3")}</p>
  </Col>
</Row>
<Row className="align-items-center">
  {/* Left Side - Text */}
  <Col md={6} className="left-side">
    <p className="history-text">{t("history_para4")}</p>
  </Col>

  {/* Right Side - Image */}
  <Col md={6} className="text-center">
    <img src={Image3} alt="Church History" className="rect-img-HD31 img-fluid" />
  </Col>
</Row>
    </Container>
  );
};

export default HistoryDetails;
