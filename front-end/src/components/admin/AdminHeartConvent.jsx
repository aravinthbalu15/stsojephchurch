import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AdminHeartConvent.css';

const AdminHeartConvent = () => {
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({ name: '', description: '', image: null });
  const [editingId, setEditingId] = useState(null);

  const fetchImages = async () => {
    const res = await axios.get('http://localhost:9000/api/heartconvent');
    setImages(res.data);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.name || !formData.description || (!editingId && !formData.image)) {
        Swal.fire('Error', 'Please fill in all required fields.', 'error');
        return;
      }

      const data = new FormData();
      data.append('name', formData.name);
      data.append('description', formData.description);
      if (formData.image) data.append('image', formData.image);

      if (editingId) {
        await axios.put(`http://localhost:9000/api/heartconvent/${editingId}`, {
          name: formData.name,
          description: formData.description,
        });
        Swal.fire('Success', 'Image updated successfully', 'success');
      } else {
        await axios.post('http://localhost:9000/api/heartconvent', data);
        Swal.fire('Success', 'Image uploaded successfully', 'success');
      }

      setFormData({ name: '', description: '', image: null });
      setEditingId(null);
      fetchImages();
    } catch (err) {
      Swal.fire('Error', 'Something went wrong!', 'error');
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this image!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:9000/api/heartconvent/${id}`);
        Swal.fire('Deleted!', 'The image has been deleted.', 'success');
        fetchImages();
      } catch (err) {
        Swal.fire('Error', 'Failed to delete image.', 'error');
      }
    }
  };

  const handleEdit = (image) => {
    setFormData({ name: image.name, description: image.description, image: null });
    setEditingId(image._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container heart my-5">
      <h2 className="text-center mt-5 mb-4">Manage Heart Convent Images</h2>
      <form onSubmit={handleSubmit} className="row g-3 mb-4">
        <div className="col-md-4">
          <input type="text" className="form-control" placeholder="Name"
            value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
        </div>
        <div className="col-md-4">
          <input type="text" className="form-control" placeholder="Description"
            value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required />
        </div>
        {!editingId && (
          <div className="col-md-4">
            <input type="file" className="form-control" onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })} required />
          </div>
        )}
        <div className="col-12 text-center">
          <button type="submit" className="btn btn-primary">{editingId ? 'Update' : 'Upload'}</button>
        </div>
      </form>

      <div className="row">
        {images.map((img) => (
          <div key={img._id} className="col-md-4 mb-4 text-center">
            <img src={img.imageUrl} alt={img.name} className="img-fluid rounded-circle shadow" style={{ width: 250, height: 250, objectFit: 'cover' }} />
            <h5 className="mt-3">{img.name}</h5>
            <p>{img.description}</p>
            <div className="d-flex justify-content-center">
              <button className="btn btn-warning me-2" onClick={() => handleEdit(img)}>Edit</button>
              <button className="btn btn-danger" onClick={() => handleDelete(img._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminHeartConvent;
