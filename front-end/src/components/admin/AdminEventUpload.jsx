import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './AdminEventUpload.css';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const AdminEventUpload = () => {
  const [events, setEvents] = useState([]);

  const [eventData, setEventData] = useState({
    description_en: "",
    description_ta: "",
    category: "current",
    image: null,
  });

  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  // Fetch Events
  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/events`);
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Form Handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setEventData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const resetForm = () => {
    setEventData({
      description_en: "",
      description_ta: "",
      category: "current",
      image: null,
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Upload Event
  const handleEventUpload = async (e) => {
    e.preventDefault();

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to upload this event?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, upload it!",
    });

    if (!result.isConfirmed) return;

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("description_en", eventData.description_en);
      formData.append("description_ta", eventData.description_ta);
      formData.append("category", eventData.category);
      formData.append("image", eventData.image);

      await axios.post(`${API_BASE_URL}/api/events/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      Swal.fire("Success", "Event uploaded successfully!", "success");
      resetForm();
      fetchEvents();
    } catch (error) {
      console.error("Upload error:", error);
      Swal.fire("Error", "Failed to upload event.", "error");
    } finally {
      setLoading(false);
    }
  };

  // Delete Event
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This event will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(`${API_BASE_URL}/api/events/${id}`);
      Swal.fire("Deleted!", "Event removed successfully!", "success");
      fetchEvents();
    } catch (error) {
      console.error("Delete error:", error);
      Swal.fire("Error", "Failed to delete event.", "error");
    }
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-center fw-bold">Upload New Event</h2>

      {/* Upload Form */}
      <form onSubmit={handleEventUpload} className="card p-4 shadow-sm mb-5">
        <div className="mb-3">
          <label className="form-label fw-bold">Description (English)</label>
          <textarea
            name="description_en"
            value={eventData.description_en}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Enter event description in English"
            rows={3}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Description (Tamil)</label>
          <textarea
            name="description_ta"
            value={eventData.description_ta}
            onChange={handleInputChange}
            className="form-control"
            placeholder="தமிழில் நிகழ்வு விவரத்தை உள்ளிடவும்"
            rows={3}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Category</label>
          <select
            name="category"
            value={eventData.category}
            onChange={handleInputChange}
            className="form-control"
            required
          >
            <option value="current">Current</option>
            <option value="upcoming">Upcoming</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Event Image</label>
          <input
            type="file"
            className="form-control"
            onChange={handleFileChange}
            accept="image/*"
            required
            ref={fileInputRef}
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Uploading..." : "Upload Event"}
        </button>
      </form>

      {/* Display Events */}
      <h2 className="mb-3 fw-bold">Uploaded Events</h2>

      {events.length === 0 ? (
        <p>No events uploaded yet.</p>
      ) : (
        <div className="row">
          {events.map((event) => (
            <div key={event._id} className="col-md-4 col-lg-3 col-sm-6 mb-4">
              <div className="card h-100 shadow-sm">
                <img
                  src={event.image}
                  alt="event"
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />

                <div className="card-body">
                  <p className="card-text small">
                    <strong>EN:</strong> {event.description_en}
                  </p>
                  <p className="card-text small">
                    <strong>TA:</strong> {event.description_ta}
                  </p>
                  <p className="card-text">
                    <strong>Category:</strong> {event.category}
                  </p>

                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(event._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminEventUpload;
