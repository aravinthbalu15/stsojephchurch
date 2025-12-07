import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/logo.png";
import "../Style/Nav.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

const Nav = () => {
  const [scrolling, setScrolling] = useState(false);
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState({});
  const location = useLocation();
  const { t, i18n } = useTranslation();

  // background change on scroll
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

  // close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        !e.target.closest(".dropdown") &&
        !e.target.closest(".dropdown-sub") &&
        !e.target.closest(".nav-lang")&&
        !e.target.closest(".mobile-lang-section")  // ⭐ added for mobile dropdown

      ) {
        closeAllDropdowns();
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Active link
  const getActiveClass = (path) =>
    location.pathname === path ? "active-link" : "";

  const switchLanguage = (lang) => {
  i18n.changeLanguage(lang);
  document.documentElement.setAttribute("lang", lang);

  // Close only mobile language dropdown
  if (window.innerWidth < 992) {
    setOpenDropdowns((prev) => ({
      ...prev,
      "mobile-lang": false,
    }));
  } else {
    closeAllDropdowns(); // desktop default
  }
};


  const renderDropdown = (label, key, items) => (
    <li
      key={key}
      className={`nav-item dropdown ${openDropdowns[key] ? "open" : ""}`}
    >
      <button
        className="nav-link2 dropdown-toggle"
        onClick={() => toggleDropdown(key)}
        aria-expanded={openDropdowns[key] || false}
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
        aria-expanded={openDropdowns[key] || false}
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
      <div className="nav-inner">
        {/* ================= TOP ROW ================= */}
        <div className="nav-top-row">
          {/* Logo + Title */}
          <Link className="navbar1-brand" to="/" onClick={closeMenu}>
            <img src={Logo} alt="Logo" className="logo1" />
            <div className="brand-texts">
              <span className="brand-title">{t("title")}</span>
              <span className="brand-subtitle">{t("kamplar")}</span>
            </div>
          </Link>

          {/* Phone + Language (desktop) + Toggler */}
          <div className="nav-right-group">

            {/* Language dropdown (desktop top row) */}
            <div className="nav-lang d-none d-lg-inline-block">
  <button
    className="nav-lang-btn"
    onClick={() => toggleDropdown("lang-top")}
  >
    {i18n.language === "en" ? "English" : "தமிழ்"} ▾
  </button>

  <ul
    className={`dropdown-menu3 nav-lang-menu ${
      openDropdowns["lang-top"] ? "show" : ""
    }`}
  >
    <li>
      <button
        className={`dropdown-item4 ${i18n.language === "en" ? "active-lang" : ""}`}
        onClick={() => switchLanguage("en")}
      >
        English
      </button>
    </li>
    <li>
      <button
        className={`dropdown-item4 ${i18n.language === "ta" ? "active-lang" : ""}`}
        onClick={() => switchLanguage("ta")}
      >
        தமிழ்
      </button>
    </li>
  </ul>
</div>


            {/* Hamburger (visible < 992px) */}
            <button className="navbar1-toggler d-lg-none" onClick={toggleNavbar}>
              <FontAwesomeIcon icon={navbarOpen ? faTimes : faBars} />
            </button>
          </div>
        </div>

        {/* ================= BOTTOM ROW: MAIN MENU ================= */}
        <div className={`nav-bottom-row ${navbarOpen ? "show" : ""}`}>
          <ul className="navbar-nav2">
    {/* 🌍 MOBILE LANGUAGE SELECT BUTTON */}
<li className="nav-item d-lg-none mobile-lang-section">
  <button
    className="mobile-lang-btn"
    onClick={() => toggleDropdown("mobile-lang")}
  >
    {i18n.language === "en" ? "English" : "தமிழ்"} ▾
  </button>

  <ul
    className={`mobile-lang-dropdown ${
      openDropdowns["mobile-lang"] ? "show" : ""
    }`}
  >
    <li>
      <button
        className={`lang-option-btn ${i18n.language === "en" ? "active-lang" : ""}`}
        onClick={() => switchLanguage("en")}
      >
        English
      </button>
    </li>
    <li>
      <button
        className={`lang-option-btn ${i18n.language === "ta" ? "active-lang-mobile" : ""}`}
        onClick={() => switchLanguage("ta")}
      >
        தமிழ்
      </button>
    </li>
  </ul>
</li>


            {/* ===== 1. HOME DROPDOWN (5 items) ===== */}
            {renderDropdown(t("home"), "home", [
              <li key="home1">
                <Link
                  className={`dropdown-item4 ${getActiveClass("/")}`}
                  to="/"
                  onClick={closeMenu}
                >
                  {t("home")}
                </Link>
              </li>,
              <li key="home2">
                <Link
                  className={`dropdown-item4 ${getActiveClass("/about")}`}
                  to="/about"
                  onClick={closeMenu}
                >
                  {t("about_us")}
                </Link>
              </li>,
              <li key="home3">
                <Link
                  className={`dropdown-item4 ${getActiveClass(
                    "/vission-mission"
                  )}`}
                  to="/vission-mission"
                  onClick={closeMenu}
                >
                  {t("vision_mission")}
                </Link>
              </li>,
              <li key="home4">
                <Link
                  className={`dropdown-item4 ${getActiveClass(
                    "/history-details"
                  )}`}
                  to="/history-details"
                  onClick={closeMenu}
                >
                  {t("history")}
                </Link>
              </li>,
              <li key="home5">
                <Link
                  className={`dropdown-item4 ${getActiveClass(
                    "/heart-convent"
                  )}`}
                  to="/heart-convent"
                  onClick={closeMenu}
                >
                  {t("heart_convent")}
                </Link>
              </li>,
              <li key="home6">
                <Link
                  className={`dropdown-item4 ${getActiveClass(
                    "/auditorium"
                  )}`}
                  to="/auditorium"
                  onClick={closeMenu}
                >
                  {t("auditorium")}
                </Link>
              </li>,
              <li key="home7">
                <Link
                  className={`dropdown-item4 ${getActiveClass(
                    "/old-priest"
                  )}`}
                  to="/old-priest"
                  onClick={closeMenu}
                >
                  {t("old_priests")}
                </Link>
              </li>,
              <li key="home8">
                <Link
                  className={`dropdown-item4 ${getActiveClass(
                    "/service"
                  )}`}
                  to="/service"
                  onClick={closeMenu}
                >
                  {t("service_people")}
                </Link>
              </li>,
              <li key="home8">
                <Link
                  className={`dropdown-item4 ${getActiveClass(
                    "/substation"
                  )}`}
                  to="/substation" substation
                  onClick={closeMenu}
                >
                  {t("substation")}
                </Link>
              </li>,
            ])}

            {/* ===== 2. ADMINISTRATION DROPDOWN (3 items) ===== */}
            {renderDropdown(t("administration"), "admin", [
              <li key="admin1">
                <Link
                  className={`dropdown-item4 ${getActiveClass("/ourparish")}`}
                  to="/ourparish"
                  onClick={closeMenu}
                >
                  {t("parish_council")}
                </Link>
              </li>,
              <li key="admin2">
                <Link
                  className={`dropdown-item4 ${getActiveClass("/anbiyam-co")}`}
                  to="/anbiyam-co"
                  onClick={closeMenu}
                >
                  {t("anbiyam_coordination")}
                </Link>
              </li>,
              <li key="admin3">
                <Link
                  className={`dropdown-item4 ${getActiveClass("/anbiyam")}`}
                  to="/anbiyam"
                  onClick={closeMenu}
                >
                  {t("anbiyam")}
                </Link>
              </li>,
            ])}

            {/* ===== 3. PARTICIPATORY STRUCTURES ===== */}
            {renderDropdown(t("participatory_structures"), "pt-sr", [
              renderSubDropdown(t("apostolic_societies"), "p1", [
                <li key="p1-1">
                  <Link
                    to="/மரியாவின் சேனை"
                    className="dropdown-item4"
                    onClick={closeMenu}
                  >
                    {t("marial_sena")}
                  </Link>
                </li>,
                <li key="p1-2">
                  <Link
                    to="/வின்சென்ட் தெ பால் சங்கம்"
                    className="dropdown-item4"
                    onClick={closeMenu}
                  >
                    {t("vincent_de_paul")}
                  </Link>
                </li>,
                <li key="p1-3">
                  <Link
                    to="/கத்தோலிக்க சேவா சங்கம்"
                    className="dropdown-item4"
                    onClick={closeMenu}
                  >
                    {t("catholic_service")}
                  </Link>
                </li>,
              ]),

              renderSubDropdown(t("formation_groups"), "p2", [
                <li key="p2-1">
                  <Link
                    to="/பாலர் சபை"
                    className="dropdown-item4"
                    onClick={closeMenu}
                  >
                    {t("balarsabha")}
                  </Link>
                </li>,
                <li key="p2-2">
                  <Link
                    to="/சிறார் இயக்கம்"
                    className="dropdown-item4"
                    onClick={closeMenu}
                  >
                    {t("children_movement")}
                  </Link>
                </li>,
                <li key="p2-3">
                  <Link
                    to="/இளம் கிறித்தவ மாணாக்கர் இயக்கம்"
                    className="dropdown-item4"
                    onClick={closeMenu}
                  >
                    {t("iycs")}
                  </Link>
                </li>,
                <li key="p2-4">
                  <Link
                    to="/இளையோர் இயக்கம்"
                    className="dropdown-item4"
                    onClick={closeMenu}
                  >
                    {t("youth_boys")}
                  </Link>
                </li>,
                <li key="p2-5">
                  <Link
                    to="/இளையோர் இயக்கம் ( பெண்கள்)"
                    className="dropdown-item4"
                    onClick={closeMenu}
                  >
                    {t("youth_girls")}
                  </Link>
                </li>,
                <li key="p2-6">
                  <Link
                    to="/பெண்கள் இயக்கம்"
                    className="dropdown-item4"
                    onClick={closeMenu}
                  >
                    {t("women_movement")}
                  </Link>
                </li>,
                <li key="p2-7">
                  <Link
                    to="/விவிலியப் பணிக்குழு"
                    className="dropdown-item4"
                    onClick={closeMenu}
                  >
                    {t("bible_committee")}
                  </Link>
                </li>,
              ]),

              renderSubDropdown(t("service_organizations"), "p3", [
                <li key="p3-1">
                  <Link
                    to="/பெண்கள் கிராம முன்னேற்றச் சங்கம்"
                    className="dropdown-item4"
                    onClick={closeMenu}
                  >
                    {t("women_selfhelp")}
                  </Link>
                </li>,
                <li key="p3-2">
                  <Link
                    to="/கோல்பிங் இயக்கம்"
                    className="dropdown-item4"
                    onClick={closeMenu}
                  >
                    {t("kolping")}
                  </Link>
                </li>,
                <li key="p3-3">
                  <Link
                    to="/கைகள் தன்னம்பிக்கை இயக்கம்"
                    className="dropdown-item4"
                    onClick={closeMenu}
                  >
                    {t("kaiakal")}
                  </Link>
                </li>,
                <li key="p3-4">
                  <Link
                    to="/அடித்தள முழுவளர்ச்சி சங்கம்"
                    className="dropdown-item4"
                    onClick={closeMenu}
                  >
                    {t("foundation_growth")}
                  </Link>
                </li>,
                <li key="p3-5">
                  <Link
                    to="/அடித்தள முழுவளர்ச்சி சங்கம்"
                    className="dropdown-item4"
                    onClick={closeMenu}
                  >
                    {t("Christian Workers Movement")}
                  </Link>
                </li>,
              ]),

              renderSubDropdown(t("worship_organizations"), "p4", [
                <li key="p4-1">
                  <Link
                    to="/வழிபாட்டுக் குழு"
                    className="dropdown-item4"
                    onClick={closeMenu}
                  >
                    {t("worship_team")}
                  </Link>
                </li>,
                <li key="p4-2">
                  <Link
                    to="/பாடகர் குழு"
                    className="dropdown-item4"
                    onClick={closeMenu}
                  >
                    {t("choir")}
                  </Link>
                </li>,
                <li key="p4-3">
                  <Link
                    to="/பீடச்சிறார்"
                    className="dropdown-item4"
                    onClick={closeMenu}
                  >
                    {t("altar_boys")}
                  </Link>
                </li>,
              ]),
            ])}

            {/* ===== 4. MAIN EVENTS ===== */}
            <li className="nav-item">
              <Link
                className={`nav-link2 ${getActiveClass("/festival")}`}
                to="/festival"
                onClick={closeMenu}
              >
                {t("main_events")}
              </Link>
            </li>

            {/* ===== 5. ANNOUNCEMENTS ===== */}
            <li className="nav-item">
              <Link
                className={`nav-link2 ${getActiveClass("/announcements")}`}
                to="/announcements"
                onClick={closeMenu}
              >
                {t("announcements")}
              </Link>
            </li>

            {/* ===== 6. GALLERY DROPDOWN ===== */}
            {renderDropdown(t("gallery"), "gallery", [
              <li key="gallery1">
                <Link
                  className={`dropdown-item4 ${getActiveClass(
                    "/images-category"
                  )}`}
                  to="/images-category"
                  onClick={closeMenu}
                >
                  {t("images")}
                </Link>
              </li>,
              <li key="gallery2">
                <Link
                  className={`dropdown-item4 ${getActiveClass("/videos")}`}
                  to="/videos"
                  onClick={closeMenu}
                >
                  {t("videos")}
                </Link>
              </li>,
            ])}

           
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
