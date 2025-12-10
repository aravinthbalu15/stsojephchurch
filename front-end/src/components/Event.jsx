import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import axios from "axios";
import { useTranslation } from "react-i18next";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../Style/Event.css";
const API_BASE_URL = import.meta.env.VITE_API_URL || "";

const UpcomingEvents = () => {
  const { t, i18n } = useTranslation();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/events`);
        setEvents(res.data || []);
      } catch (err) {
        console.error("fetch events:", err.response?.data || err.message);
      }
    };
    fetchEvents();
  }, []);

  const eventsCurrent = events.filter((e) => (e.category || "").toLowerCase() === "current");
  const eventsUpcoming = events.filter((e) => (e.category || "").toLowerCase() === "upcoming");

  const sliderSettings = (count) => ({
    dots: true,
    infinite: count > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: count > 1,
    autoplaySpeed: 3500,
    arrows: count > 1,
    responsive: [
      {
        breakpoint: 768,
        settings: { arrows: false },
      },
    ],
  });

  const getText = (ev) => {
    const lang = i18n.language?.startsWith("ta") ? "ta" : "en";
    return lang === "ta" ? ev.description_ta : ev.description_en;
  };

  return (
    <div className="container my-4 upcoming-events-component">
      <div className="row gy-4">
        <div className="col-lg-6 col-md-12">
          <div className="p-3 border rounded">
            <h4 className="text-center mb-3">{t("current_events") || "Current Events"}</h4>
            {eventsCurrent.length === 0 ? (
              <p className="text-center">{t("no_current_events") || "No current events."}</p>
            ) : (
              <Slider {...sliderSettings(eventsCurrent.length)}>
                {eventsCurrent.map((ev) => (
                  <div key={`c-${ev._id}`} className="text-center">
                    <img src={ev.image} alt="event" style={{ width: "100%", maxHeight: 380, objectFit: "cover" }} />
                    <p className="mt-2">{getText(ev)}</p>
                  </div>
                ))}
              </Slider>
            )}
          </div>
        </div>

        <div className="col-lg-6 col-md-12">
          <div className="p-3 border rounded">
            <h4 className="text-center mb-3">{t("upcoming_events") || "Upcoming Events"}</h4>
            {eventsUpcoming.length === 0 ? (
              <p className="text-center">{t("no_upcoming_events") || "No upcoming events."}</p>
            ) : (
              <Slider {...sliderSettings(eventsUpcoming.length)}>
                {eventsUpcoming.map((ev) => (
                  <div key={`u-${ev._id}`} className="text-center">
                    <img src={ev.image} alt="event" style={{ width: "100%", maxHeight: 380, objectFit: "cover" }} />
                    <p className="mt-2">{getText(ev)}</p>
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
