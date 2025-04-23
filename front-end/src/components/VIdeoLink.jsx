import React, { useRef, useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../Style/VideoLink.css";
import video1 from "../Videos/video1.mp4";
import video2 from "../Videos/video2.mp4";
import video3 from "../Videos/video3.mp4";
import video4 from "../Videos/video4.mp4";

const videos = [
  { id: 1, src: video1, title: "Cathedral Alter Interior" },
  { id: 2, src: video2, title: "Christ the King" },
  { id: 3, src: video3, title: "Cathedral with Chandelier" },
  { id: 4, src: video4, title: "Church Ceremony" },
];

const VideoLink = () => {
  const scrollRef = useRef(null);
  const navigate = useNavigate();
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    checkScroll();
    
    const scrollInterval = setInterval(() => {
      if (scrollRef.current) {
        if (
          scrollRef.current.scrollLeft + scrollRef.current.clientWidth >=
          scrollRef.current.scrollWidth
        ) {
          // If reached the end, scroll back to the start
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          // Scroll forward
          scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
        }
      }
    }, 2500); // Auto-scroll every 2.5 seconds

    return () => clearInterval(scrollInterval);
  }, []);

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
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
      setTimeout(checkScroll, 300);
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
      setTimeout(checkScroll, 300);
    }
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

        {/* Video Scroll Container */}
        <div className="video-container" ref={scrollRef} onScroll={checkScroll}>
          {videos.map((video) => (
            <div key={video.id} className="video-item">
              <video controls>
                <source src={video.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        {canScrollRight && (
          <FaChevronRight className="nav-icon right" onClick={scrollRight} />
        )}
      </div>

      {/* Read More Button */}
      <button className="read-more-btn" onClick={() => navigate("/videos")}>
        More Videos
      </button>
    </Container>
  );
};

export default VideoLink;
