import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../Style/ImageCategory.css";

// Import images correctly
import image1 from "../images/january.png";
import image2 from "../images/feb.png";
import image3 from "../images/march.png";
import image4 from "../images/april.png";
import image5 from "../images/may.png";
import image6 from "../images/june.png";
import image7 from "../images/july.png";
import image8 from "../images/august.png";
import image9 from "../images/sep.png";
import image10 from "../images/oct.png";
import image11 from "../images/nov.png";
import image12 from "../images/dec.png";


const categories = [
  { title: "January", image: image1, path: "/jan" },
  { title: "February", image: image2, path: "/feb" },
  { title: "March", image: image3, path: "/march" },
  { title: "April", image: image4, path: "/april" },
  { title: "May", image: image5, path: "/may" },
  { title: "June", image: image6, path: "/june" },
  { title: "July", image: image7, path: "/july" },
  { title: "August", image: image8, path: "/august" },
  { title: "September", image: image9, path: "/sept" },
  { title: "October", image: image10, path: "/oct" },
  { title: "November", image: image11, path: "/nov" },
  { title: "December", image: image12, path: "/dec" },
];

const ImageCategory = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (path) => {
    navigate(path); // Navigate to the correct path
  };

  return (
    <Container className="gallery-container ">
      <h2 className="section-title mt-5">Image Categories</h2>
      <Row>
        {categories.map((category, index) => (
          <Col md={4} sm={6} xs={12} key={index} className="mb-4">
            <Card className="album-card" onClick={() => handleCategoryClick(category.path)}>
              <Card.Img variant="top" src={category.image} className="album-image" />
              <Card.Body>
                <Card.Title className="album-title">{category.title}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ImageCategory;
