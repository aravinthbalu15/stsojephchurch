import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/logo.png";
import "../Style/Nav.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next"; // 🆕 Added

const Nav = () => {
  const [scrolling, setScrolling] = useState(false);
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState({});
  const location = useLocation();
  const { t, i18n } = useTranslation(); // 🆕 Added

  useEffect(() => {
    if (location.pathname === "/") {
      const handleScroll = () => setScrolling(window.scrollY > 50);
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    } else {
      setScrolling(true);
    }
  }, [location.pathname]);

  const toggleNavbar = () => setNavbarOpen((prev) => !prev);

  const toggleDropdown = (key) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const closeMenu = () => {
    setNavbarOpen(false);
    setOpenDropdowns({});
  };

  const closeAllDropdowns = () => setOpenDropdowns({});

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        !e.target.closest(".dropdown") &&
        !e.target.closest(".dropdown-sub")
      ) {
        closeAllDropdowns();
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const renderDropdown = (label, key, items) => (
    <li key={key} className="nav-item dropdown">
      <button
        className={`nav-link2 dropdown-toggle ${openDropdowns[key] ? "open" : ""}`}
        onClick={() => toggleDropdown(key)}
        aria-expanded={openDropdowns[key]}
      >
        {label}
      </button>
      <ul className={`dropdown-menu3 ${openDropdowns[key] ? "show" : ""}`}>
        {items}
      </ul>
    </li>
  );

  const renderSubDropdown = (label, key, items) => (
    <li key={key} className="dropdown-sub">
      <button
        className={`dropdown-link55 ${openDropdowns[key] ? "open" : ""}`}
        onClick={() => toggleDropdown(key)}
        aria-expanded={openDropdowns[key]}
      >
        {label}
      </button>
      <ul className={`dropdown-menu-sub ${openDropdowns[key] ? "show" : ""}`}>
        {items}
      </ul>
    </li>
  );

  return (
    <nav className={`navbar1 ${scrolling ? "scrolled" : "transparent"}`}>
      <div className="container-fluid">
        <Link className="navbar1-brand" to="/" onClick={closeMenu}>
          <img src={Logo} alt="Logo" className="logo1" />
          <h1>
            {t("title")} <span className="newline">{t("kamplar")}</span>
          </h1>
        </Link>

        <button className="navbar1-toggler" onClick={toggleNavbar}>
          <FontAwesomeIcon icon={navbarOpen ? faTimes : faBars} size="2x" />
        </button>

        <div className={`navbar1-collapse ${navbarOpen ? "show" : ""}`}>
          <ul className="navbar-nav2">

            {renderDropdown(t("home"), "home", [
              <li key="home1"><Link className="dropdown-item4" to="/" onClick={closeMenu}>{t("home")}</Link></li>,
              <li key="home2"><Link className="dropdown-item4" to="/about" onClick={closeMenu}>{t("about_us")}</Link></li>,
              <li key="home3"><Link className="dropdown-item4" to="/vission-mission" onClick={closeMenu}>{t("vision_mission")}</Link></li>,
              <li key="home4"><Link className="dropdown-item4" to="/history-details" onClick={closeMenu}>{t("history")}</Link></li>,
              <li key="home5"><Link className="dropdown-item4" to="/heart-convent" onClick={closeMenu}>{t("heart_convent")}</Link></li>,
              <li key="home6"><Link className="dropdown-item4" to="/auditorium" onClick={closeMenu}>{t("auditorium")}</Link></li>,
              <li key="home7"><Link className="dropdown-item4" to="/old-priest" onClick={closeMenu}>{t("old_priests")}</Link></li>,
              <li key="home8"><Link className="dropdown-item4" to="/service" onClick={closeMenu}>{t("service_people")}</Link></li>,
              <li key="home9"><Link className="dropdown-item4" to="/substation" onClick={closeMenu}>{t("substation")}</Link></li>
            ])}

            {renderDropdown(t("administration"), "admin", [
              <li key="admin1"><Link className="dropdown-item4" to="/ourparish" onClick={closeMenu}>{t("parish_council")}</Link></li>,
              <li key="admin2"><Link className="dropdown-item4" to="/anbiyam-co" onClick={closeMenu}>{t("anbiyam_coordination")}</Link></li>,
              <li key="admin3"><Link className="dropdown-item4" to="/anbiyam" onClick={closeMenu}>{t("anbiyam")}</Link></li>,
            ])}

            {renderDropdown(t("participatory_structures"), "pt-sr", [
              renderSubDropdown(t("apostolic_societies"), "p1", [
                <li key="p1-1"><Link to="/மரியாவின் சேனை" className="dropdown-item4" onClick={closeMenu}>{t("marial_sena")}</Link></li>,
                <li key="p1-2"><Link to="/வின்சென்ட் தெ பால் சங்கம்" className="dropdown-item4" onClick={closeMenu}>{t("vincent_de_paul")}</Link></li>,
                <li key="p1-3"><Link to="/கத்தோலிக்க சேவா சங்கம்" className="dropdown-item4" onClick={closeMenu}>{t("catholic_service")}</Link></li>,
              ]),
              renderSubDropdown(t("formation_groups"), "p2", [
                <li key="p2-1"><Link to="/பாலர் சபை" className="dropdown-item4" onClick={closeMenu}>{t("balarsabha")}</Link></li>,
                <li key="p2-2"><Link to="/சிறார் இயக்கம்" className="dropdown-item4" onClick={closeMenu}>{t("children_movement")}</Link></li>,
                <li key="p2-3"><Link to="/இளம் கிறித்தவ மாணாக்கர் இயக்கம்" className="dropdown-item4" onClick={closeMenu}>{t("iycs")}</Link></li>,
                <li key="p2-4"><Link to="/இளையோர் இயக்கம்" className="dropdown-item4" onClick={closeMenu}>{t("youth_boys")}</Link></li>,
                <li key="p2-5"><Link to="/இளையோர் இயக்கம் ( பெண்கள்)" className="dropdown-item4" onClick={closeMenu}>{t("youth_girls")}</Link></li>,
                <li key="p2-6"><Link to="/பெண்கள் இயக்கம்" className="dropdown-item4" onClick={closeMenu}>{t("women_movement")}</Link></li>,
                <li key="p2-7"><Link to="/விவிலியப் பணிக்குழு" className="dropdown-item4" onClick={closeMenu}>{t("bible_committee")}</Link></li>,
              ]),
              renderSubDropdown(t("service_organizations"), "p3", [
                <li key="p3-1"><Link to="/பெண்கள் கிராம முன்னேற்றச் சங்கம்" className="dropdown-item4" onClick={closeMenu}>{t("women_selfhelp")}</Link></li>,
                <li key="p3-2"><Link to="/கோல்பிங் இயக்கம்" className="dropdown-item4" onClick={closeMenu}>{t("kolping")}</Link></li>,
                <li key="p3-3"><Link to="/கைகள் தன்னம்பிக்கை இயக்கம்" className="dropdown-item4" onClick={closeMenu}>{t("kaiakal")}</Link></li>,
                <li key="p3-4"><Link to="/அடித்தள முழுவளர்ச்சி சங்கம்" className="dropdown-item4" onClick={closeMenu}>{t("foundation_growth")}</Link></li>,
                <li key="p3-4"><Link to="/அடித்தள முழுவளர்ச்சி சங்கம்" className="dropdown-item4" onClick={closeMenu}>{t("Christian Workers Movement")}</Link></li>

              ]),
              renderSubDropdown(t("worship_organizations"), "p4", [
                <li key="p4-1"><Link to="/வழிபாட்டுக் குழு" className="dropdown-item4" onClick={closeMenu}>{t("worship_team")}</Link></li>,
                <li key="p4-2"><Link to="/பாடகர் குழு" className="dropdown-item4" onClick={closeMenu}>{t("choir")}</Link></li>,
                <li key="p4-3"><Link to="/பீடச்சிறார்" className="dropdown-item4" onClick={closeMenu}>{t("altar_boys")}</Link></li>
              ])
            ])}

            <li className="nav-item">
              <Link className="nav-link2" to="/festival" onClick={closeMenu}>{t("main_events")}</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link2" to="/announcements" onClick={closeMenu}>{t("announcements")}</Link>
            </li>

            {renderDropdown(t("gallery"), "gallery", [
              <li key="gallery1"><Link className="dropdown-item4" to="/images-category" onClick={closeMenu}>{t("images")}</Link></li>,
              <li key="gallery2"><Link className="dropdown-item4" to="/videos" onClick={closeMenu}>{t("videos")}</Link></li>
            ])}

            {/* 🆕 Languages Dropdown */}
            {renderDropdown(t("language"), "lang", [
  <li key="lang-en">
    <Link 
      className="dropdown-item4" 
      onClick={() => { i18n.changeLanguage("en"); closeMenu(); }}
    >
      {t("english")}
    </Link>
  </li>,
  <li key="lang-ta">
    <Link 
      className="dropdown-item4" 
      onClick={() => { i18n.changeLanguage("ta"); closeMenu(); }}
    >
      {t("tamil")}
    </Link>
  </li>
])}


          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
