import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Modal, Button, Spinner } from 'react-bootstrap';
import Swal from 'sweetalert2';
import '../../components/admin/AdminImageUpload.css';

const BASE_URL = `${import.meta.env.VITE_API_URL}`;   // ⭐ Using env BASE URL

const AdminImageUpload = () => {
  const [month, setMonth] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [uploading, setUploading] = useState(false);

  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchAllImages();
  }, []);

  const fetchAllImages = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/images`);
      setImages(response.data);
    } catch (error) {
      console.error("Fetching images failed:", error);
    }
  };

  const resetFields = () => {
    setMonth('');
    setTitle('');
    setDescription('');
    setImageFile(null);

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!month || !title || !description || !imageFile) {
      Swal.fire('Missing Fields', 'Please fill all fields.', 'warning');
      return;
    }

    const result = await Swal.fire({
      title: 'Confirm Upload',
      text: 'Do you want to upload this image?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, upload it!',
    });

    if (!result.isConfirmed) return;

    const formData = new FormData();
    formData.append('month', month);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', imageFile);

    setUploading(true);

    try {
      const res = await axios.post(`${BASE_URL}/api/images/upload-image`, formData);
      setImages(prev => [res.data.image, ...prev]);

      resetFields();
      Swal.fire('Success', 'Image uploaded successfully!', 'success');
    } catch (error) {
      console.error("Upload error:", error);
      Swal.fire('Error', 'Upload failed. Please try again.', 'error');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this image?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    });

    if (!confirm.isConfirmed) return;

    try {
      await axios.delete(`${BASE_URL}/api/images/delete-image/${id}`);
      setImages(prev => prev.filter(img => img._id !== id));

      resetFields();

      Swal.fire('Deleted', 'Image has been deleted.', 'success');
    } catch (error) {
      console.error("Delete error:", error);
      Swal.fire('Error', 'Failed to delete image', 'error');
    }
  };

  return (
    <div className="container admin-upload-image py-5">
      <h2 className="text-center mb-4">📷 Upload Image to Monthly Gallery</h2>

      <form onSubmit={handleUpload}>
        <div className="form-group mb-3">
          <label>Category (Month):</label>
          <select
            className="form-control"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            required
          >
            <option value="">Select Month</option>
            {[
              "January", "February", "March", "April", "May", "June",
              "July", "August", "September", "October", "November", "December"
            ].map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>

        <div className="form-group mb-3">
          <label>Title:</label>
          <input className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>

        <div className="form-group mb-3">
          <label>Description:</label>
          <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>

        <div className="form-group mb-3">
          <label>Image:</label>
          <input
            ref={fileInputRef}
            className="form-control"
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            required
          />
        </div>

        <Button type="submit" variant="primary" disabled={uploading}>
          {uploading ? <Spinner animation="border" size="sm" /> : 'Upload'}
        </Button>
      </form>

      <h3 className="text-center mt-5">🖼️ Uploaded Images</h3>
      <div className="row mt-4">
        {images.map((img) => (
          <div key={img._id} className="col-sm-6 col-md-4 mb-4">
            <div className="gallery-card p-3 shadow-sm border rounded">
              <img
                src={img.url}
                alt={img.title}
                className="img-fluid mb-2"
                style={{ cursor: 'pointer', height: '200px', objectFit: 'cover', width: '100%' }}
                onClick={() => { setSelectedItem(img); setShowModal(true); }}
              />

              <h6 className="text-primary fw-bold">{img.month}</h6>
              <h5>{img.title}</h5>
              <p className="text-muted small">{img.description}</p>

              <Button variant="danger" size="sm" onClick={() => handleDelete(img._id)}>
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
        {selectedItem && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>
                {selectedItem.title} — <span className="text-primary">{selectedItem.month}</span>
              </Modal.Title>
            </Modal.Header>

            <Modal.Body className="text-center">
              <img src={selectedItem.url} className="img-fluid" style={{ maxHeight: '70vh' }} />
              <p className="mt-3">{selectedItem.description}</p>
            </Modal.Body>
          </>
        )}
      </Modal>
    </div>
  );
};

export default AdminImageUpload;
