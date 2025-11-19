import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./AdminAnbiyamCoordination.css";

const AdminAnbiyamCoordination = () => {
  const [members, setMembers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
  });
  const [editId, setEditId] = useState(null);

  const fetchMembers = async () => {
    try {
      const res = await axios.get("http://localhost:9000/api/acmembers");
      setMembers(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const confirmResult = await Swal.fire({
      title: editId ? 'Confirm Update' : 'Confirm Create',
      text: editId ? 'Are you sure you want to update this member?' : 'Are you sure you want to create this member?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: editId ? 'Yes, update it!' : 'Yes, create it!'
    });

    if (!confirmResult.isConfirmed) return;

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    if (formData.image) data.append("image", formData.image);

    try {
      if (editId) {
        await axios.put(`http://localhost:9000/api/acmembers/${editId}`, data);
        Swal.fire("Updated!", "Member updated successfully.", "success");
      } else {
        await axios.post("http://localhost:9000/api/acmembers", data);
        Swal.fire("Created!", "Member created successfully.", "success");
      }
      setFormData({ name: "", description: "", image: null });
      setEditId(null);
      fetchMembers();
    } catch (error) {
      console.error(error);
      Swal.fire("Error!", "Something went wrong.", "error");
    }
  };

  const handleDelete = async (id) => {
    const confirmResult = await Swal.fire({
      title: 'Are you sure?',
      text: 'This member will be permanently deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });

    if (!confirmResult.isConfirmed) return;

    try {
      await axios.delete(`http://localhost:9000/api/acmembers/${id}`);
      Swal.fire("Deleted!", "Member deleted successfully.", "success");
      fetchMembers();
    } catch (error) {
      console.error(error);
      Swal.fire("Error!", "Something went wrong.", "error");
    }
  };

  const handleEdit = (member) => {
    setFormData({ name: member.name, description: member.description, image: null });
    setEditId(member._id);
  };

  return (
    <div className="container an-co mt-5">
      <h2 className="mb-4 text-center">Manage Anbiyam Coordination</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <textarea
          className="form-control mb-2"
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
        <input
          type="file"
          className="form-control mb-2"
          onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
        />
        <button type="submit" className="btn btn-primary">{editId ? "Update" : "Create"}</button>
      </form>

      <hr />

      <div className="row">
        {members.map((member) => (
          <div className="col-md-4" key={member._id}>
            <div className="card mb-4">
              <img src={member.imageUrl} className="card-img-top" alt={member.name} />
              <div className="card-body">
                <h5 className="card-title">{member.name}</h5>
                <p className="card-text">{member.description}</p>
                <button className="btn btn-warning me-2" onClick={() => handleEdit(member)}>Edit</button>
                <button className="btn btn-danger" onClick={() => handleDelete(member._id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminAnbiyamCoordination;
