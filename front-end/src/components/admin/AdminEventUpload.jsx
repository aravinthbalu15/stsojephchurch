import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './AdminEventUpload.css';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const AdminEventUpload = () => {
  const [events, setEvents] = useState([]);
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    category: '',
    image: null
  });

  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/events`);
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error.response?.data || error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    setEventData(prevData => ({ ...prevData, image: e.target.files[0] }));
  };

  const resetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleEventUpload = async (e) => {
    e.preventDefault();

    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to upload this event?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, upload it!',
      cancelButtonText: 'No, cancel!',
    });

    if (result.isConfirmed) {
      setLoading(true);

      const formData = new FormData();
      formData.append('title', eventData.title);
      formData.append('description', eventData.description);
      formData.append('category', eventData.category);
      formData.append('image', eventData.image);

      try {
        await axios.post(`${API_BASE_URL}/api/events/upload`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        Swal.fire('Success', 'Event uploaded successfully!', 'success');

        setEventData({ title: '', description: '', category: '', image: null });
        resetFileInput();
        fetchEvents();
      } catch (error) {
        console.error("Error uploading event:", error.response?.data || error.message);
        Swal.fire('Error', 'Failed to upload event. Please try again.', 'error');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "Do you really want to delete this event?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${API_BASE_URL}/api/events/${id}`);
        Swal.fire('Deleted', 'Event deleted successfully', 'success');
        resetFileInput();
        fetchEvents();
      } catch (error) {
        console.error("Error deleting event:", error.response?.data || error.message);
        Swal.fire('Error', 'Failed to delete event. Please try again.', 'error');
      }
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="upcoming-event container py-4">
      <h2 className="mb-4">Upload New Event</h2>

      <form onSubmit={handleEventUpload} className="mb-5">
        <div className="mb-3">
          <input
            type="text"
            name="title"
            value={eventData.title}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Event Title"
            required
          />
        </div>

        <div className="mb-3">
          <textarea
            name="description"
            value={eventData.description}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Event Description"
            required
          />
        </div>

        <div className="mb-3">
          <select
            name="category"
            value={eventData.category}
            onChange={handleInputChange}
            className="form-control"
            required
          >
            <option value="">Select Category</option>
            <option value="current">Current</option>
            <option value="upcoming">Upcoming</option>
          </select>
        </div>

        <div className="mb-3">
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
          {loading ? 'Uploading...' : 'Upload Event'}
        </button>
      </form>

      <h2 className="mb-3">Uploaded Events</h2>
      {events.length === 0 ? (
        <p>No events uploaded yet.</p>
      ) : (
        <div className="row">
          {events.map((event) => (
            <div key={event._id} className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                {event.image && (
                  <img
                    src={event.image}
                    alt={event.title}
                    className="card-img-top"
                    style={{ objectFit: 'cover', height: '200px' }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{event.title}</h5>
                  <p className="card-text">{event.description}</p>
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
