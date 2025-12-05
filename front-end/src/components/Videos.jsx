import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import "../Style/Videos.css";
import { useTranslation } from "react-i18next";
const Videos = () => {
  const { t } = useTranslation();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get('http://localhost:9000/api/videos');
        setVideos(res.data);
      } catch (err) {
        console.error('Error fetching videos:', err);
      }
    };

    fetchVideos();
  }, []);

  return (
    <Container className="mt-5 mb-5 video-sections">
      <h2 className=" videoss mt-5 text-center mb-4 text-primary fw-bold">{t("videos")}</h2>

      <Row>
        {videos.map((video) => (
          <Col md={4} sm={6} xs={12} key={video._id} className="mb-4">
            <Card className="shadow-sm video-cards h-100">
              <div className="video-wrappers">
                <video className="w-100" controls>
                  <source src={video.secure_url} type="video/mp4" />
                </video>
              </div>

              {/* <Card.Body className="text-center">
                <Card.Title className="fw-semibold fs-5">{video.title}</Card.Title>
              </Card.Body> */}
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Videos;
