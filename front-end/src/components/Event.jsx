import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../Style/Event.css";
import axios from "axios";
import { useTranslation } from "react-i18next";

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/events`
        );
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  // Click → Open full event page
  const handleEventClick = (eventId) => {
    navigate(`/event/${eventId}`);
  };

  // Slider settings
  const getSliderSettings = (count) => ({
    dots: true,
    infinite: count > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: count > 1,
    autoplaySpeed: 3000,
    arrows: count > 1,
    swipe: count > 1,
    draggable: count > 1,
    responsive: [
      {
        breakpoint: 768,
        settings: { slidesToShow: 1, arrows: false },
      },
    ],
  });

  // Categorize events
  const currentEvents = events.filter(e => e.category === "current");
  const upcomingEvents = events.filter(e => e.category === "upcoming");

  // Select correct description based on language
  const getDescription = (ev) => {
    return i18n.language === "ta" ? ev.description_ta : ev.description_en;
  };

  return (
    <div className="upcoming-events container py-4">

      <div className="row justify-content-between">

        {/* CURRENT EVENTS */}
        <div className="col-lg-5 col-md-6 col-sm-12 mb-4">
          <div className="event-box p-3 shadow-sm">
            <h3 className="text-center event-titles">
              {t("current_events")}
            </h3>

            {currentEvents.length === 0 ? (
              <p className="text-center">{t("no_current_events")}</p>
            ) : (
              <Slider {...getSliderSettings(currentEvents.length)}>
                {currentEvents.map((ev) => (
                  <div
                    key={ev._id}
                    className="event-card"
                    // onClick={() => handleEventClick(ev._id)}
                  >
                    <img src={ev.image} alt="event" className="event-image" />
                    <p className="event-caption">{getDescription(ev)}</p>
                  </div>
                ))}
              </Slider>
            )}
          </div>
        </div>

        {/* UPCOMING EVENTS */}
        <div className="col-lg-5 col-md-6 col-sm-12 mb-4">
          <div className="event-box p-3 shadow-sm">
            <h3 className="text-center event-titles">
              {t("upcoming_events")}
            </h3>

            {upcomingEvents.length === 0 ? (
              <p className="text-center">{t("no_upcoming_events")}</p>
            ) : (
              <Slider {...getSliderSettings(upcomingEvents.length)}>
                {upcomingEvents.map((ev) => (
                  <div
                    key={ev._id}
                    className="event-card"
                    // onClick={() => handleEventClick(ev._id)

                    // }
                  >
                    <img src={ev.image} alt="event" className="event-image" />
                    <p className="event-caption">{getDescription(ev)}</p>
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
