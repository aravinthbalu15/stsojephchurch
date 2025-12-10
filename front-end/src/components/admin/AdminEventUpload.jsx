import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import "./AdminEventUpload.css";

const API_BASE_URL = import.meta.env.VITE_API_URL || "";

const AdminEventUpload = () => {
  const { t } = useTranslation();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  // New event form state (no title, only descriptions+category+image)
  const [form, setForm] = useState({
    description_en: "",
    description_ta: "",
    category: "current",
    image: null,
  });

  const fileInputRef = useRef(null);

  // Edit modal state
  const [showEdit, setShowEdit] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const editFileRef = useRef(null);

  // Fetch events
  const fetchEvents = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/events`);
      setEvents(res.data || []);
    } catch (err) {
      console.error("Fetch events error:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // input change handlers
  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const onFileChange = (e) => {
    setForm((p) => ({ ...p, image: e.target.files[0] || null }));
  };

  const resetNewForm = () => {
    setForm({ description_en: "", description_ta: "", category: "current", image: null });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Create (Upload)
  const handleUpload = async (e) => {
    e.preventDefault();

    // validation
    if (!form.description_en.trim() || !form.description_ta.trim()) {
      return Swal.fire("Error", t("please_fill_description") || "Please fill description (EN & TA)", "error");
    }
    if (!form.image) {
      return Swal.fire("Error", t("please_select_image") || "Please select an image", "error");
    }

    const confirm = await Swal.fire({
      title: t("confirm_upload") || "Are you sure?",
      showCancelButton: true,
      confirmButtonText: t("yes_upload") || "Yes, upload it!",
    });

    if (!confirm.isConfirmed) return;

    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("description_en", form.description_en);
      fd.append("description_ta", form.description_ta);
      fd.append("category", form.category);
      fd.append("image", form.image);

      await axios.post(`${API_BASE_URL}/api/events/upload`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      Swal.fire(t("success") || "Success", t("event_uploaded") || "Event uploaded successfully!", "success");
      resetNewForm();
      fetchEvents();
    } catch (err) {
      console.error("Upload error:", err.response?.data || err.message);
      Swal.fire(t("error") || "Error", t("upload_failed") || "Failed to upload event.", "error");
    } finally {
      setLoading(false);
    }
  };

  // Delete
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: t("confirm_delete") || "Are you sure?",
      text: t("confirm_delete_text") || "Do you really want to delete this event?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: t("yes_delete") || "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(`${API_BASE_URL}/api/events/${id}`);
      Swal.fire(t("deleted") || "Deleted", t("event_deleted") || "Event deleted successfully", "success");
      fetchEvents();
    } catch (err) {
      console.error("Delete error:", err.response?.data || err.message);
      Swal.fire(t("error") || "Error", t("delete_failed") || "Failed to delete event.", "error");
    }
  };

  // Open edit modal
  const openEdit = (event) => {
    setEditingEvent(event);
    setShowEdit(true);
  };

  // Close edit modal
  const closeEdit = () => {
    setShowEdit(false);
    setEditingEvent(null);
    if (editFileRef.current) editFileRef.current.value = "";
  };

  // Handle edit form change
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingEvent((p) => ({ ...p, [name]: value }));
  };

  const handleEditFileChange = (e) => {
    setEditingEvent((p) => ({ ...p, newImageFile: e.target.files[0] || null }));
  };

  // Submit edit
  const submitEdit = async () => {
    if (!editingEvent) return;
    if (!editingEvent.description_en?.trim() || !editingEvent.description_ta?.trim()) {
      return Swal.fire("Error", t("please_fill_description") || "Please fill description (EN & TA)", "error");
    }

    const confirm = await Swal.fire({
      title: t("confirm_update") || "Update event?",
      showCancelButton: true,
      confirmButtonText: t("yes_update") || "Yes, update",
    });

    if (!confirm.isConfirmed) return;

    setEditLoading(true);
    try {
      const fd = new FormData();
      fd.append("description_en", editingEvent.description_en);
      fd.append("description_ta", editingEvent.description_ta);
      fd.append("category", editingEvent.category || "current");

      // If a new image was selected, send it; otherwise backend will use existing image URL from body
      if (editingEvent.newImageFile) {
        fd.append("image", editingEvent.newImageFile);
      } else {
        // send current image URL so backend has something in req.body.image if needed
        fd.append("image", editingEvent.image || "");
      }

      await axios.put(`${API_BASE_URL}/api/events/${editingEvent._id}`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      Swal.fire(t("success") || "Success", t("event_updated") || "Event updated successfully", "success");
      closeEdit();
      fetchEvents();
    } catch (err) {
      console.error("Edit error:", err.response?.data || err.message);
      Swal.fire(t("error") || "Error", t("update_failed") || "Failed to update event.", "error");
    } finally {
      setEditLoading(false);
    }
  };

  return (
    <div className="adminupcoming-event container  py-4">
      <h2 className="mb-4">{t("upload_new_event") || "Upload New Event"}</h2>

      <form onSubmit={handleUpload} className="mb-5">
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">{t("description_en") || "Description (English)"}</label>
            <textarea
              name="description_en"
              value={form.description_en}
              onChange={onChange}
              className="form-control"
              placeholder={t("desc_en_placeholder") || "Enter English description"}
              rows={4}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">{t("description_ta") || "Description (Tamil)"}</label>
            <textarea
              name="description_ta"
              value={form.description_ta}
              onChange={onChange}
              className="form-control"
              placeholder={t("desc_ta_placeholder") || "Enter Tamil description"}
              rows={4}
              required
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">{t("category") || "Category"}</label>
            <select name="category" value={form.category} onChange={onChange} className="form-select" required>
              <option value="current">{t("current") || "Current"}</option>
              <option value="upcoming">{t("upcoming") || "Upcoming"}</option>
            </select>
          </div>

          <div className="col-md-8">
            <label className="form-label">{t("image") || "Image"}</label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="form-control"
              onChange={onFileChange}
              required
            />
          </div>

          <div className="col-12">
            <button className="btn btn-primary" type="submit" disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" /> : t("upload_event") || "Upload Event"}
            </button>
            <button
              type="button"
              className="btn btn-secondary ms-2"
              onClick={resetNewForm}
              disabled={loading}
            >
              {t("reset") || "Reset"}
            </button>
          </div>
        </div>
      </form>

      <h2 className="mb-3">{t("uploaded_events") || "Uploaded Events"}</h2>

      {events.length === 0 ? (
        <p>{t("no_events") || "No events uploaded yet."}</p>
      ) : (
        <div className="row">
          {events.map((ev) => (
            <div className="col-lg-4 col-md-6 mb-4" key={ev._id}>
              <div className="card h-100 shadow-sm event-card">
                {ev.image && (
                  <img
                    src={ev.image}
                    alt={ev.description_en?.slice(0, 40) || "event"}
                    className="card-img-top event-img"
                    style={{ objectFit: "cover", height: 200 }}
                  />
                )}
                <div className="card-body d-flex flex-column">
                  <p className="card-text small text-muted mb-2">
                    <strong>{t("category") || "Category"}:</strong> {ev.category}
                  </p>

                  <p className="card-text event-desc">
                    {ev.description_en?.length > 120 ? ev.description_en.slice(0, 120) + "..." : ev.description_en}
                  </p>

                  <div className="mt-auto d-flex gap-2">
                    <button className="btn btn-outline-primary w-100" onClick={() => openEdit(ev)}>
                      {t("edit") || "Edit"}
                    </button>
                    <button className="btn btn-danger w-100" onClick={() => handleDelete(ev._id)}>
                      {t("delete") || "Delete"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      <Modal show={showEdit} onHide={closeEdit} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{t("edit_event") || "Edit Event"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editingEvent ? (
            <div className="row g-3">
              <div className="col-md-12">
                <label className="form-label">{t("description_en") || "Description (English)"}</label>
                <textarea
                  name="description_en"
                  value={editingEvent.description_en || ""}
                  onChange={handleEditChange}
                  className="form-control"
                  rows={3}
                />
              </div>
              <div className="col-md-12">
                <label className="form-label">{t("description_ta") || "Description (Tamil)"}</label>
                <textarea
                  name="description_ta"
                  value={editingEvent.description_ta || ""}
                  onChange={handleEditChange}
                  className="form-control"
                  rows={3}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">{t("category") || "Category"}</label>
                <select
                  name="category"
                  value={editingEvent.category || "current"}
                  onChange={handleEditChange}
                  className="form-select"
                >
                  <option value="current">{t("current") || "Current"}</option>
                  <option value="upcoming">{t("upcoming") || "Upcoming"}</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">{t("replace_image") || "Replace Image (optional)"}</label>
                <input
                  ref={editFileRef}
                  type="file"
                  accept="image/*"
                  className="form-control"
                  onChange={handleEditFileChange}
                />
              </div>

              <div className="col-md-12">
                <label className="form-label">{t("current_image") || "Current Image"}</label>
                <div className="border rounded p-2 text-center">
                  {editingEvent.image ? (
                    <img src={editingEvent.image} alt="current" className="img-fluid" style={{ maxHeight: 240 }} />
                  ) : (
                    <div>{t("no_image") || "No image"}</div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div>{t("loading") || "Loading..."}</div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeEdit} disabled={editLoading}>
            {t("cancel") || "Cancel"}
          </Button>
          <Button variant="primary" onClick={submitEdit} disabled={editLoading}>
            {editLoading ? <Spinner animation="border" size="sm" /> : t("save_changes") || "Save Changes"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminEventUpload;
