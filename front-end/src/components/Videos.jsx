import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import "../Style/Videos.css";

const Videos = () => {
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
    <Container className="videos mt-5">
      <h2 className="text-center mb-4">Our Videos</h2>
      <Row>
        {videos.map((video) => (
          <Col md={4} sm={6} xs={12} key={video._id} className="mb-4">
            <div className="video-container">
              <video width="100%" height="250" controls>
                <source src={video.secure_url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <h5 className="mt-2 text-center">{video.title}</h5>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Videos;
