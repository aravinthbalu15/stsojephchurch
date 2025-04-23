import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../Style/Quotes.css"; // Import styles

const quotes = [
  {
    text: "Greater love has no one than this: to lay down one's life for one's friends.",
    reference: "John 15:13",
  },
  {
    text: "The Lord is my shepherd; I shall not want.",
    reference: "Psalm 23:1",
  },
  {
    text: "For God so loved the world that He gave His only Son.",
    reference: "John 3:16",
  },
];

const WordOfGod = () => {
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="word-of-god">
      <Container>
        <div className="justify-content-center align-items-center">
          <Col md={10} className="text-center">
            <p className="subheading">WORD OF GOD</p>
            <h2 key={currentQuote} className="quote fade-in-slide">
              <span className="highlights">"{quotes[currentQuote].text}"</span>
            </h2>
            <p className="references">{quotes[currentQuote].reference}</p>
          </Col>
        </div>
      </Container>
    </section>
  );
};

export default WordOfGod;
