import React, { useState } from "react";
import { motion } from "framer-motion";
import "../Style/Contact.css";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message Sent Successfully!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <motion.section 
      className="contact-section mt-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
    >
      <div className="contact-container mb-5">
        <h2>Contact Us</h2>
        <p>Have a question or need assistance? Send us a message!</p>

        <form className="contact-form" onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
          <textarea name="message" placeholder="Your Message" rows="5" value={formData.message} onChange={handleChange} required></textarea>
          <button type="submit">Send Message</button>
        </form>

        <div className="contact-details">
          <p><FaMapMarkerAlt />Kamplar, Tamil Nadu 629157</p>
          <p><FaPhone /> +1 234 567 890</p>
          <p><FaEnvelope /> stjosephchurch@gmail.com</p>
          
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;
