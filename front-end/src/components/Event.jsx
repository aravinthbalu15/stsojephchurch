import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../Style/Event.css";
import axios from "axios";
import { useTranslation } from "react-i18next";
import PresidentSkeleton from "./PresidentSkeleton";

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
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
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleEventClick = (eventId) => {
    navigate(`/event/${eventId}`);
  };

  const getSliderSettings = (count) => ({
    dots: count > 1,
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

  // ✅ Validate image
  const hasValidImage = (img) =>
    img && typeof img === "string" && img.trim() !== "";

  // ✅ Filter events with valid images
  const currentEvents = events.filter(
    (e) => e.category === "current" && hasValidImage(e.image)
  );

  const upcomingEvents = events.filter(
    (e) => e.category === "upcoming" && hasValidImage(e.image)
  );

  const getDescription = (ev) =>
    i18n.language === "ta" ? ev.description_ta : ev.description_en;

  const getOptimizedImage = (url) => {
    if (!url || !url.includes("cloudinary")) return url;
    return url.replace("/upload/", "/upload/f_auto,q_auto,w_600/");
  };

  // ✅ Layout Logic
  const showCurrent = !loading && currentEvents.length > 0;
  const showUpcoming = !loading && upcomingEvents.length > 0;
  const isSingleSection = showCurrent ^ showUpcoming;

  return (
    <div className="upcoming-events container py-4">
      <div
        className={`row ${
          isSingleSection
            ? "single-event-center"
            : "justify-content-between"
        }`}
      >
        {/* CURRENT EVENTS */}
        {showCurrent && (
          <div
            className={`${
              isSingleSection
                ? "col-lg-6 col-md-8 col-sm-12"
                : "col-lg-5 col-md-6 col-sm-12"
            } mb-4`}
          >
            <div className="event-box p-3 shadow-sm">
              <h3 className="text-center event-titles">
                {t("current_events")}
              </h3>

              <Slider {...getSliderSettings(currentEvents.length)}>
                {currentEvents.map((ev) => (
                  <div
                    key={ev._id}
                    className="event-card"
                    onClick={() => handleEventClick(ev._id)}
                  >
                    <img
                      src={getOptimizedImage(ev.image)}
                      alt="event"
                      className="event-image"
                      loading="lazy"
                    />
                    <p className="event-caption">
                      {getDescription(ev)}
                    </p>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        )}

        {/* UPCOMING EVENTS */}
        {showUpcoming && (
          <div
            className={`${
              isSingleSection
                ? "col-lg-6 col-md-8 col-sm-12"
                : "col-lg-5 col-md-6 col-sm-12"
            } mb-4`}
          >
            <div className="event-box p-3 shadow-sm">
              <h3 className="text-center event-titles">
                {t("upcoming_events")}
              </h3>

              <Slider {...getSliderSettings(upcomingEvents.length)}>
                {upcomingEvents.map((ev) => (
                  <div
                    key={ev._id}
                    className="event-card"
                    onClick={() => handleEventClick(ev._id)}
                  >
                    <img
                      src={getOptimizedImage(ev.image)}
                      alt="event"
                      className="event-image"
                      loading="lazy"
                    />
                    <p className="event-caption">
                      {getDescription(ev)}
                    </p>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        )}

        {/* Skeleton Loader */}
        {loading && (
          <>
            <div className="col-lg-5 col-md-6 col-sm-12 mb-4">
              <PresidentSkeleton />
            </div>
            <div className="col-lg-5 col-md-6 col-sm-12 mb-4">
              <PresidentSkeleton />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UpcomingEvents;