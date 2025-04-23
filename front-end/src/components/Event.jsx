import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Style/Event.css";
import axios from "axios";

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:9000/api/events");
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  const handleEventClick = (eventId) => {
    navigate(`/event/${eventId}`);
  };

  // Dynamic slider settings generator
  const getSliderSettings = (eventCount) => ({
    dots: true,
    infinite: eventCount > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: eventCount > 1,
    autoplaySpeed: 3000,
    arrows: eventCount > 1,
    swipe: eventCount > 1,
    draggable: eventCount > 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 1,
          arrows: eventCount > 1,
          dots: eventCount > 1
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          arrows: eventCount > 1,
          dots: eventCount > 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          arrows: eventCount > 1,
          dots: eventCount > 1
        }
      }
    ]
  });

  const eventPostersLeft = events.filter(
    (event) => event.category?.toLowerCase() === "current"
  );
  const eventPostersRight = events.filter(
    (event) => event.category?.toLowerCase() === "upcoming"
  );

  return (
    <div className="upcoming-events">
      <div className="row justify-content-between">
        {/* Current Events Column */}
        <div className="col-lg-5 col-md-6 col-sm-12 mb-4">
          <div className="event-box p-3">
            <h3 className="text-center event-titles">Current Events</h3>
            {eventPostersLeft.length === 0 ? (
              <p className="text-center">No current events.</p>
            ) : (
              <Slider {...getSliderSettings(eventPostersLeft.length)}>
                {eventPostersLeft.map((event) => (
                  <div
                    key={`left-${event._id}`}
                    className="event-card"
                    onClick={() => handleEventClick(event._id)}
                  >
                    <img
                      src={event.image}
                      alt={event.title}
                      className="event-image"
                    />
                    <p className="event-caption">{event.title}</p>
                  </div>
                ))}
              </Slider>
            )}
          </div>
        </div>

        {/* Upcoming Events Column */}
        <div className="col-lg-5 col-md-6 col-sm-12 mb-4">
          <div className="event-box p-3">
            <h3 className="text-center event-titles">Upcoming Events</h3>
            {eventPostersRight.length === 0 ? (
              <p className="text-center">No upcoming events.</p>
            ) : (
              <Slider {...getSliderSettings(eventPostersRight.length)}>
                {eventPostersRight.map((event) => (
                  <div
                    key={`right-${event._id}`}
                    className="event-card"
                    onClick={() => handleEventClick(event._id)}
                  >
                    <img
                      src={event.image}
                      alt={event.title}
                      className="event-image"
                    />
                    <p className="event-caption">{event.title}</p>
                  </div>
                ))}
              </Slider>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingEvents;