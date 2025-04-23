import React from 'react';
import '../Style/HistoryDetails.css';
import { Container, Row, Col } from 'react-bootstrap';
import Image1 from "../images/History/1.png";
import Image2 from "../images/History/2.png";
// Anbiyam 1


const HistoryDetails = () => {
  return (
    <Container className="anbiyangal-container mt-5">
      {/* Anbiyangal 1 */}
      <h1 className="section-title">Our History</h1>
      <h3 className="section-subtitle text-center">St.Joseph's Church, Kamplar</h3>
<br />
      <Row className="align-items-center">
  {/* Left Side - Image */}
  <Col md={6} className="text-center">
    <img src={Image1} alt="Church History" className="rect-img-HD3 img-fluid" />
  </Col>

  {/* Right Side - Text */}
  <Col md={6} className="right-side">
    <p className="history-text">
    Kamplar has a long history of adherence to Christian faith, mercifully led by God through waves of dramatic events, led by great parish priests and committed Catholic persons.
The stone-cut Cross which has been venerated at Devandivilai, at the heart of Kamplar parish, whose style is ascribed to the times of St. Thomas the Apostle, is a certain witness to show that Christianity had gained foothold at Kamplar, even many centuries before the arrival of St. Xavier to Kanyakumari district. It is undisputable that Christianity at Kamplar was at least as old as the parish of Vencode, one of whose part Kamplar has always been. (That ancient cross has been transferred with due veneration to the front part of the new St. Joseph's Church, Kamplar, blessed in 2014).</p>
  </Col>
</Row>

<Row className="align-items-center">
  {/* Left Side - Text */}
  <Col md={6} className="left-side">
    <p className="history-text">The date of building of St. Mary's Church over the above said stone-cut Cross at Devandivilai is shrouded in the shadows of remote past. Yet the fact that the primary school that was started at Kamplar in 1927 was named after St. Mary vouches to the fact that it was at least much older than that school. It is historical that the people of Kamplar were given permission to attend liturgical services at St. Mary's Church from 9-6-1946, having a separate administration, however continuing to be a substations of Vencode parish. St. Mary's Primary School was started at Kamplar in 1927 and it was catering to the early education of the people of Kamplar and unfortunately it was closed down in 1946.</p>
  </Col>

  {/* Right Side - Image */}
  <Col md={6} className="text-center">
    <img src={Image2} alt="Church History" className="rect-img-HD img-fluid" />
  </Col>
</Row>
<Row className="align-items-center">
  {/* Left Side - Image */}
  <Col md={6} className="text-center">
    <img src={Image2} alt="Church History" className="rect-img-HD31 img-fluid"/>
  </Col>

  {/* Right Side - Text */}
  <Col md={6} className="right-side">
    <p className="history-text">After about 15 years, considering the enhanced conveniences, Rev. Fr. Peter Lazar Christan, the then parish priest of Vencode, initiated building a new church at Kamplar, which was blessed on 26-7-1964, having St. Joseph as its patron.
When Vizhunthayambalam was erected into a parish, Kamplar became  its substation from Nov.13, 1984.  Eventually, Kamplar was elevated to be a parish on Nov.9, 2008 at the recommendation of Rev. Fr. Benedict, having Fr. Arul Devadhasan as its first parish priest.  
The Golden Jubilee  of St. Joseph's Church, Kamplar, was celebrated in a grand manner in July, 2014.  In perpetual commemoration of the Golden Jubilee of St. Joseph's Church, a new church was built with the pastoral leadership of Fr. Arul Devadasan and full cooperation of the people. The new church was joyfully blessed on 25-7-2014, just a day before the Golden Jubilee.
</p>
  </Col>
</Row>
<Row className="align-items-center">
  {/* Left Side - Text */}
  <Col md={6} className="left-side">
    <p className="history-text">Together with the development of their places of worship, the people of Kamplar were also developing in their practice of Christian faith and in the other aspects of human life. The community has increased in size having more than 225 families now. It can boast of enviable human resource development with 100% literacy, decent educational qualifications and relative emancipation from poverty. The strong Christian motivation Kamplar people have, together with their deep faith in God and filial attachment to  St. Joseph, will surely take them to new heights
    </p>
  </Col>

  {/* Right Side - Image */}
  <Col md={6} className="text-center">
    <img src={Image2} alt="Church History" className="rect-img-HD31 img-fluid" />
  </Col>
</Row>
    </Container>
  );
};

export default HistoryDetails;
