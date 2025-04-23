import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../images/logo.png";
import "../Style/Nav.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

const Nav = () => {
  const [scrolling, setScrolling] = useState(false);
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState({});
  const location = useLocation();

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
            St Joseph's Church<span className="newline">Kamplar</span>
          </h1>
        </Link>
        <button className="navbar1-toggler" onClick={toggleNavbar}>
          <FontAwesomeIcon icon={navbarOpen ? faTimes : faBars} size="2x" />
        </button>

        <div className={`navbar1-collapse ${navbarOpen ? "show" : ""}`}>
          <ul className="navbar-nav2">
            {renderDropdown("Home", "home", [
              <li key="home1"><Link className="dropdown-item4" to="/" onClick={closeMenu}>Home</Link></li>,
              <li key="home2"><Link className="dropdown-item4" to="/about" onClick={closeMenu}>About us</Link></li>,
              <li key="home2"><Link className="dropdown-item4" to="/vission-mission" onClick={closeMenu}>Vision & Mission</Link></li>,

              <li key="home3"><Link className="dropdown-item4" to="/history-details" onClick={closeMenu}>Our History</Link></li>,
              <li key="home4"><Link className="dropdown-item4" to="/heart-convent" onClick={closeMenu}>Sacred Heart Convent</Link></li>,
              <li key="home5"><Link className="dropdown-item4" to="/auditorium" onClick={closeMenu}>St.Joseph's Auditorium</Link></li>,
              <li key="home6"><Link className="dropdown-item4" to="/old-priest" onClick={closeMenu}>Our Parish Priests</Link></li>,
              <li key="home7"><Link className="dropdown-item4" to="/service" onClick={closeMenu}>Our People at God's Service</Link></li>,
              <li key="home8"><Link className="dropdown-item4" to="/substation" onClick={closeMenu}>The Substation</Link></li>
            ])}

            {renderDropdown("Administration", "admin", [
              <li key="admin1"><Link className="dropdown-item4" to="/ourparish" onClick={closeMenu}>Our Parish Pastoral Council</Link></li>,
              <li key="admin2"><Link className="dropdown-item4" to="/anbiyam-co" onClick={closeMenu}>Coordination of anbiyams</Link></li>,
              <li key="admin3"><Link className="dropdown-item4" to="/anbiyam" onClick={closeMenu}>Anbiyams</Link></li>
            ])}

            {renderDropdown("Participatary Structures", "pt-sr", [
              renderSubDropdown("திருத்தூதுக் கழகங்கள்", "p1", [
                <li key="p1-1"><Link to="/மரியாவின் சேனை" className="dropdown-item4" onClick={closeMenu}>மரியாயின் சேனை</Link></li>,
                <li key="p1-2"><Link to="/வின்சென்ட் தெ பால் சங்கம்" className="dropdown-item4" onClick={closeMenu}>வின்சென்ட் தெ பால் சங்கம்</Link></li>,
                <li key="p1-3"><Link to="/கத்தோலிக்க சேவா சங்கம்" className="dropdown-item4" onClick={closeMenu}>கத்தோலிக்க சேவா சங்கம்</Link></li>
              ]),
              renderSubDropdown("உருவாக்க அமைப்புகள்", "p2", [
                <li key="p2-1"><Link to="/பாலர் சபை" className="dropdown-item4" onClick={closeMenu}>பாலர் சபை</Link></li>,
                <li key="p2-2"><Link to="/சிறார் இயக்கம்" className="dropdown-item4" onClick={closeMenu}>சிறார் இயக்கம்</Link></li>,
                <li key="p2-3"><Link to="/இளம் கிறித்தவ மாணாக்கர் இயக்கம்" className="dropdown-item4" onClick={closeMenu}>இளம் கிறித்தவ மாணாக்கர் இயக்கம்</Link></li>,
                <li key="p2-4"><Link to="/இளையோர் இயக்கம்" className="dropdown-item4" onClick={closeMenu}>இளையோர் இயக்கம் ( ஆண்கள்)</Link></li>,
                <li key="p2-5"><Link to="/இளையோர் இயக்கம் ( பெண்கள்)" className="dropdown-item4" onClick={closeMenu}>இளையோர் இயக்கம் ( பெண்கள்)</Link></li>,
                <li key="p2-6"><Link to="/பெண்கள் இயக்கம்" className="dropdown-item4" onClick={closeMenu}>பெண்கள் இயக்கம்</Link></li>,
                <li key="p2-7"><Link to="/விவிலியப் பணிக்குழு" className="dropdown-item4" onClick={closeMenu}>விவிலியப் பணிக்குழு</Link></li>
              ]),
              renderSubDropdown("சேவை அமைப்புகள்", "p3", [
                <li key="p3-1"><Link to="/பெண்கள் கிராம முன்னேற்றச் சங்கம்" className="dropdown-item4" onClick={closeMenu}>பெண்கள் கிராம முன்னேற்றச் சங்கம்</Link></li>,
                <li key="p3-2"><Link to="/கோல்பிங் இயக்கம்" className="dropdown-item4" onClick={closeMenu}>கோல்பிங் இயக்கம்</Link></li>,
                <li key="p3-3"><Link to="/கைகள் தன்னம்பிக்கை இயக்கம்" className="dropdown-item4" onClick={closeMenu}>கைகள் தன்னம்பிக்கை இயக்கம்</Link></li>,
                <li key="p3-4"><Link to="/அடித்தள முழுவளர்ச்சி சங்கம்" className="dropdown-item4" onClick={closeMenu}>அடித்தள முழுவளர்ச்சி சங்கம்</Link></li>
              ]),
              renderSubDropdown("வழிபாட்டு அமைப்புகள்", "p4", [
                <li key="p4-1"><Link to="/வழிபாட்டுக் குழு" className="dropdown-item4" onClick={closeMenu}>வழிபாட்டுக் குழு</Link></li>,
                <li key="p4-2"><Link to="/பாடகர் குழு" className="dropdown-item4" onClick={closeMenu}>பாடகர் குழு</Link></li>,
                <li key="p4-3"><Link to="/பீடச்சிறார்" className="dropdown-item4" onClick={closeMenu}>பீடச்சிறார்</Link></li>
              ])
            ])}

            <li className="nav-item">
              <Link className="nav-link2" to="/festival" onClick={closeMenu}>Main Events</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link2" to="/announcements" onClick={closeMenu}>Announcements</Link>
            </li>
             <li className="nav-item">
              <Link className="nav-link2" to="/festival" onClick={closeMenu}>Learn&Grow</Link>
            </li>
            {renderDropdown("Gallery", "gallery", [
              <li key="gallery1"><Link className="dropdown-item4" to="/images-category" onClick={closeMenu}>Images</Link></li>,
              <li key="gallery2"><Link className="dropdown-item4" to="/videos" onClick={closeMenu}>Videos</Link></li>
            ])}

            
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
