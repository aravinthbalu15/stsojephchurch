import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Modal, Button, Spinner, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import "../../components/admin/AdminImageUpload.css";

const BASE_URL = import.meta.env.VITE_API_URL;

const AdminImageUpload = () => {
  /* ================= STATE ================= */
  const [month, setMonth] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const [titleEn, setTitleEn] = useState("");
  const [titleTa, setTitleTa] = useState("");

  const [descEn, setDescEn] = useState("");
  const [descTa, setDescTa] = useState("");

  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  // Edit modal
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [savingEdit, setSavingEdit] = useState(false);

  const fileInputRef = useRef(null);

  /* ================= FETCH ================= */
  useEffect(() => {
    fetchAllImages();
  }, []);

  const fetchAllImages = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/images`);
      setImages(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  /* ================= GROUP BY MONTH ================= */
  const groupedImages = images.reduce((acc, img) => {
    if (!acc[img.month]) {
      acc[img.month] = [];
    }
    acc[img.month].push(img);
    return acc;
  }, {});

  /* ================= RESET ================= */
  const resetFields = () => {
    setMonth("");
    setTitleEn("");
    setTitleTa("");
    setDescEn("");
    setDescTa("");
    setImageFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  /* ================= UPLOAD ================= */
  const handleUpload = async (e) => {
    e.preventDefault();

    if (!month || !titleEn || !titleTa || !descEn || !descTa || !imageFile) {
      Swal.fire("Missing Fields", "Fill all EN & TA fields", "warning");
      return;
    }

    const confirm = await Swal.fire({
      title: "Confirm Upload",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Upload",
    });

    if (!confirm.isConfirmed) return;

    const formData = new FormData();
    formData.append("month", month);
    formData.append("title", JSON.stringify({ en: titleEn, ta: titleTa }));
    formData.append("description", JSON.stringify({ en: descEn, ta: descTa }));
    formData.append("image", imageFile);

    try {
      setUploading(true);
      const res = await axios.post(
        `${BASE_URL}/api/images/upload-image`,
        formData
      );
      setImages((prev) => [res.data, ...prev]);
      resetFields();
      Swal.fire("Success", "Image uploaded", "success");
    } catch (err) {
      Swal.fire("Error", "Upload failed", "error");
    } finally {
      setUploading(false);
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete Image?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axios.delete(`${BASE_URL}/api/images/${id}`);
      setImages((prev) => prev.filter((img) => img._id !== id));
      Swal.fire("Deleted", "Image removed", "success");
    } catch (err) {
      Swal.fire("Error", "Delete failed", "error");
    }
  };

  /* ================= EDIT ================= */
  const openEditModal = (item) => {
    setEditItem(item);
    setTitleEn(item.title?.en || "");
    setTitleTa(item.title?.ta || "");
    setDescEn(item.description?.en || "");
    setDescTa(item.description?.ta || "");
    setShowModal(true);
  };

  const handleUpdate = async () => {
    if (!titleEn || !titleTa || !descEn || !descTa) {
      Swal.fire("Missing Fields", "Fill all fields", "warning");
      return;
    }

    try {
      setSavingEdit(true);
      await axios.put(`${BASE_URL}/api/images/${editItem._id}`, {
        title: JSON.stringify({ en: titleEn, ta: titleTa }),
        description: JSON.stringify({ en: descEn, ta: descTa }),
      });

      fetchAllImages();
      setShowModal(false);
      Swal.fire("Updated", "Image updated successfully", "success");
    } catch (err) {
      Swal.fire("Error", "Update failed", "error");
    } finally {
      setSavingEdit(false);
    }
  };

  /* ================= UI ================= */
  return (
    <div className="container admin-upload-image py-5">
      <h2 className="text-center mb-4">📷 Monthly Gallery – Admin</h2>

      {/* ---------- UPLOAD FORM ---------- */}
      <Form onSubmit={handleUpload}>
        <Form.Select
          className="mb-3"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        >
          <option value="">Select Month</option>
          {[
            "January","February","March","April","May","June",
            "July","August","September","October","November","December",
          ].map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </Form.Select>

        <Form.Control className="mb-2" placeholder="Title (English)"
          value={titleEn} onChange={(e) => setTitleEn(e.target.value)} />

        <Form.Control className="mb-2" placeholder="Title (Tamil)"
          value={titleTa} onChange={(e) => setTitleTa(e.target.value)} />

        <Form.Control as="textarea" className="mb-2"
          placeholder="Description (English)"
          value={descEn} onChange={(e) => setDescEn(e.target.value)} />

        <Form.Control as="textarea" className="mb-3"
          placeholder="Description (Tamil)"
          value={descTa} onChange={(e) => setDescTa(e.target.value)} />

        <Form.Control type="file" ref={fileInputRef}
          onChange={(e) => setImageFile(e.target.files[0])}
          className="mb-3" />

        <Button type="submit" disabled={uploading}>
          {uploading ? <Spinner size="sm" /> : "Upload"}
        </Button>
      </Form>

      {/* ---------- MONTH WISE IMAGE LIST ---------- */}
      <div className="mt-5">
        {Object.keys(groupedImages).map((monthName) => (
          <div key={monthName} className="mb-5">
            <h4 className="text-primary border-bottom pb-2 mb-3">
              📅 {monthName}
            </h4>

            <div className="row">
              {groupedImages[monthName].map((img) => (
                <div key={img._id} className="col-md-4 mb-4">
                  <div className="gallery-card p-3 shadow rounded">
                    <img
                      src={img.url}
                      className="img-fluid mb-2 rounded"
                      style={{ height: 200, objectFit: "cover", width: "100%" }}
                    />
                    <h5>{img.title.en}</h5>
                    <p className="small">{img.description.en}</p>

                    <Button size="sm" variant="warning" className="me-2"
                      onClick={() => openEditModal(img)}>
                      Edit
                    </Button>

                    <Button size="sm" variant="danger"
                      onClick={() => handleDelete(img._id)}>
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ---------- EDIT MODAL ---------- */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Image</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Control className="mb-2" value={titleEn}
            onChange={(e) => setTitleEn(e.target.value)} />

          <Form.Control className="mb-2" value={titleTa}
            onChange={(e) => setTitleTa(e.target.value)} />

          <Form.Control as="textarea" className="mb-2"
            value={descEn} onChange={(e) => setDescEn(e.target.value)} />

          <Form.Control as="textarea"
            value={descTa} onChange={(e) => setDescTa(e.target.value)} />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleUpdate}>
            {savingEdit ? <Spinner size="sm" /> : "Update"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminImageUpload;
