import React, { useState, useEffect } from "react";
import "../Style/Background.css";
import Image4 from "../images/image1.png";
import Image2 from "../images/image2.png";
import Image3 from "../images/image3.png";
import Image1 from "../images/image4.png";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const images = [Image1, Image2, Image3, Image4];
const proverbs = [
  "Faith moves mountains",
  "Grace guides the humble heart",
  "In His light we see light",
  "Love never fails"
];

const paragraphs = [
  ["John 15:13"],
  ["Psalm 23:1"],
  ["John 3:16"],
  ["Love 3:90"]
];

const BackgroundSlider = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 8000);
    return () => clearInterval(interval);
  }, [index]);

  const nextSlide = () => setIndex((prev) => (prev + 1) % images.length);
  const prevSlide = () => setIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <>
      <div className="background-slider">
        {images.map((img, i) => (
          <div
            key={i}
            className={`bg-image ${i === index ? "active" : "inactive"}`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}

        <div className="overlay">
          {proverbs.map((text, i) => (
            <div key={i} className={`proverb ${i === index ? "show" : "hide"}`}>
              <span className="quote-mark left">“</span>
              <p>{text}</p>
              <span className="quote-mark right">”</span>

              {/* Render first paragraph */}
              <div>
              <h1 className="verse-text">{paragraphs[i][0]}</h1>

              </div>
              
            </div>
          ))}
          
        </div>
        

        <button className="arrow left-arrow" onClick={prevSlide}>
          <FaArrowLeft />
        </button>
        <button className="arrow right-arrow" onClick={nextSlide}>
          <FaArrowRight />
        </button>
      </div>
    </>
  );
};

export default BackgroundSlider;
