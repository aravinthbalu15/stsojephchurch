import React from "react";
import "../Style/Footer.css";
import { FaFacebook, FaInstagram, FaYoutube, FaTwitter, FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const Footer = () => {
    const { t } = useTranslation();
  
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Left Section - Church Info & Contact */}
        <div className="footer-info">
          <h2 className="brand-name">{t("title")}</h2>
          <p className="church-description">{t("church_add_desc")}</p>

          <div className="contact-info">
            <p><FaMapMarkerAlt />{t("church_address")}</p>
            <p><FaPhone /> +1 234 567 890</p>
            <p><FaEnvelope /> stjosephchurch@gmail.com</p>
          </div>

          <div className="social-icons">
            <a href="#"><FaFacebook /></a>
            <a href="https://www.instagram.com/st_josephs_church_kamplar?igsh=MWF3NjQwbXNwN21nZQ%3D%3D&utm_source=qr"><FaInstagram /></a>
            <a href="#"><FaYoutube /></a>
            <a href="#"><FaTwitter /></a>
          </div>
        </div>

        {/* Right Section - Live Map */}
        <div className="footer-map">
  <iframe
    title="Church Location"
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3930.472617477095!2d77.2098626!3d8.2551928!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b04ffc1fd2167d3%3A0x2fe800de0583381b!2sSt.%20Joseph's%20Church!5e0!3m2!1sen!2sin!4v1637146025097!5m2!1sen!2sin"
    allowFullScreen=""
    loading="lazy"
  ></iframe>
</div>


      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} St JOSEPH CHURCH. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
