import React, { useRef, useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Style/VideoLink.css";

const VideoLink = () => {
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  const [videos, setVideos] = useState([]);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Load Videos from Backend
  const fetchVideos = async () => {
    try {
      const res = await axios.get("http://localhost:9000/api/videolink");
      setVideos(res.data);
    } catch (err) {
      console.error("Failed to load videos:", err);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  useEffect(() => {
    checkScroll();

    const scrollInterval = setInterval(() => {
      if (scrollRef.current) {
        if (
          scrollRef.current.scrollLeft + scrollRef.current.clientWidth >=
          scrollRef.current.scrollWidth
        ) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
        }
      }
    }, 2500);

    return () => clearInterval(scrollInterval);
  }, [videos]);

  const checkScroll = () => {
    if (scrollRef.current) {
      setCanScrollLeft(scrollRef.current.scrollLeft > 0);
      setCanScrollRight(
        scrollRef.current.scrollLeft + scrollRef.current.clientWidth <
          scrollRef.current.scrollWidth
      );
    }
  };

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" });
    setTimeout(checkScroll, 300);
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" });
    setTimeout(checkScroll, 300);
  };

  return (
    <Container className="video-section">
      <h2 className="section-title">
        Our <span className="highlights">Videos</span>
      </h2>

      <div className="video-wrapper">
        {/* Left Arrow */}
        {canScrollLeft && (
          <FaChevronLeft className="nav-icon left" onClick={scrollLeft} />
        )}

        {/* Video Slider */}
        <div className="video-container" ref={scrollRef} onScroll={checkScroll}>
          {videos.length === 0 ? (
            <p style={{ padding: "20px", fontSize: "18px" }}>Loading...</p>
          ) : (
            videos.map((video) => (
              <div key={video._id} className="video-item">
                <video controls>
                  <source src={video.videoUrl} type="video/mp4" />
                </video>
                <p className="video-title">{video.title}</p>
              </div>
            ))
          )}
        </div>

        {/* Right Arrow */}
        {canScrollRight && (
          <FaChevronRight className="nav-icon right" onClick={scrollRight} />
        )}
      </div>

      <button className="read-more-btn" onClick={() => navigate("/videos")}>
        More Videos
      </button>
    </Container>
  );
};

export default VideoLink;
