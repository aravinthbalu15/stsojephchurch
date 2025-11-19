import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const AdminPresident = () => {
  const [presidents, setPresidents] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    description: '',
    image: null,
  });
  const [editId, setEditId] = useState(null);

  const fetchPresidents = async () => {
    try {
      const res = await axios.get('http://localhost:9000/api/presidents');
      setPresidents(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPresidents();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const uploadData = new FormData();
    uploadData.append('name', formData.name);
    uploadData.append('role', formData.role);
    uploadData.append('description', formData.description);
    if (formData.image) uploadData.append('image', formData.image);

    try {
      if (editId) {
        await axios.put(`http://localhost:9000/api/presidents/${editId}`, uploadData);
        Swal.fire('Updated!', 'President details updated.', 'success');
      } else {
        await axios.post('http://localhost:9000/api/presidents', uploadData);
        Swal.fire('Added!', 'President added successfully.', 'success');
      }

      setFormData({ name: '', role: '', description: '', image: null });
      setEditId(null);
      fetchPresidents();
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Something went wrong.', 'error');
    }
  };

  const handleEdit = (president) => {
    setFormData({
      name: president.name,
      role: president.role,
      description: president.description,
      image: null, // We'll upload a new one if needed
    });
    setEditId(president._id);
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this entry!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`http://localhost:9000/api/presidents/${id}`);
        Swal.fire('Deleted!', 'President has been deleted.', 'success');
        fetchPresidents();
      } catch (err) {
        console.error(err);
        Swal.fire('Error', 'Deletion failed.', 'error');
      }
    }
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">Admin - Manage Presidents</h2>

      <form onSubmit={handleSubmit} className="mb-5">
        <div className="mb-3">
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="text"
            name="role"
            placeholder="Role"
            className="form-control"
            value={formData.role}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <textarea
            name="description"
            placeholder="Description"
            className="form-control"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="file"
            name="image"
            className="form-control"
            accept="image/*"
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          {editId ? 'Update' : 'Add'} President
        </button>
      </form>

      <div className="row">
        {presidents.map((president) => (
          <div className="col-md-4 mb-4" key={president._id}>
            <div className="card h-100 text-center">
              <img
                src={president.image}
                className="card-img-top"
                alt={president.name}
                style={{ height: '250px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">{president.name}</h5>
                <h6 className="card-subtitle text-muted">{president.role}</h6>
                <p className="card-text">{president.description}</p>
                <button
                  onClick={() => handleEdit(president)}
                  className="btn btn-warning me-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(president._id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPresident;
