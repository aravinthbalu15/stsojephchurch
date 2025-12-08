import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Button, Form, Modal, Card, Badge } from "react-bootstrap";
import Swal from "sweetalert2";
import "./AdminParish.css";

const BASE_URL = `${import.meta.env.VITE_API_URL}`;   // ⭐ GLOBAL API

const AdminParish = () => {
  const [category, setCategory] = useState("member");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [members, setMembers] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [editMember, setEditMember] = useState(null);
  const [filterCategory, setFilterCategory] = useState("all");

  const addFileRef = useRef(null);
  const editFileRef = useRef(null);

  const fetchMembers = async () => {
    const res = await axios.get(`${BASE_URL}/api/parish`);
    setMembers(res.data);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You cannot undo this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${BASE_URL}/api/parish/${id}`);
        Swal.fire("Deleted!", "Member removed.", "success");
        fetchMembers();
      } catch (error) {
        Swal.fire("Error", "Failed to delete.", "error");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return;

    const confirm = await Swal.fire({
      title: "Upload Member?",
      text: "Confirm upload.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Upload",
    });

    if (!confirm.isConfirmed) return;

    const formData = new FormData();
    formData.append("category", category);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("image", image);

    try {
      setUploading(true);
      await axios.post(`${BASE_URL}/api/parish`, formData);
      Swal.fire("Success!", "Parish member added.", "success");

      setName("");
      setDescription("");
      setImage(null);
      setCategory("member");

      if (addFileRef.current) addFileRef.current.value = "";

      fetchMembers();
    } catch {
      Swal.fire("Error!", "Upload failed.", "error");
    } finally {
      setUploading(false);
    }
  };

  const openEditModal = (member) => {
    setEditMember(member);
    setEditModal(true);
    if (editFileRef.current) editFileRef.current.value = "";
  };

  const handleEditSave = async () => {
    if (!editMember) return;

    const confirm = await Swal.fire({
      title: "Update Member?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Update",
    });

    if (!confirm.isConfirmed) return;

    const formData = new FormData();
    formData.append("category", editMember.category);
    formData.append("name", editMember.name);
    formData.append("description", editMember.description);

    if (editMember.image) {
      formData.append("image", editMember.image);
    }

    try {
      await axios.put(
        `${BASE_URL}/api/parish/${editMember._id}`,
        editMember.image
          ? formData
          : {
              category: editMember.category,
              name: editMember.name,
              description: editMember.description,
              imageUrl: editMember.imageUrl,
            }
      );

      Swal.fire("Updated!", "Member updated.", "success");

      if (editFileRef.current) editFileRef.current.value = "";

      setEditModal(false);
      fetchMembers();
    } catch {
      Swal.fire("Error!", "Update failed.", "error");
    }
  };

  const filteredList =
    filterCategory === "all"
      ? members
      : members.filter((m) => m.category === filterCategory);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Parish Member Management</h2>

      <div className="d-flex justify-content-center gap-3 mb-4 category-buttons">
        {["all", "head", "subhead", "member"].map((cat) => (
          <Button
            key={cat}
            variant={filterCategory === cat ? "primary" : "outline-primary"}
            onClick={() => setFilterCategory(cat)}
            className="px-3"
          >
            {cat.toUpperCase()}
          </Button>
        ))}
      </div>

      <div className="p-4 shadow-sm mb-5">
        <h4>Add Parish Member</h4>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="head">Head</option>
              <option value="subhead">Subhead</option>
              <option value="member">Member</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              required
              ref={addFileRef}
              onChange={(e) => setImage(e.target.files[0])}
            />
          </Form.Group>

          <Button type="submit" disabled={uploading}>
            {uploading ? "Uploading..." : "Add Member"}
          </Button>
        </Form>
      </div>

      <h3 className="mb-3">Members</h3>
      <div className="row">
        {filteredList.map((m) => (
          <div className="col-md-3 col-sm-6 mb-4" key={m._id}>
            <Card className="shadow-sm parish-card">
              <Card.Img variant="top" src={m.imageUrl} className="square-img" />
              <Card.Body>
                <h5>{m.name}</h5>
                <p className="small">{m.description}</p>
                <Badge bg="secondary" className="mb-2">
                  {m.category.toUpperCase()}
                </Badge>
                <div className="d-flex justify-content-between">
                  <Button size="sm" onClick={() => openEditModal(m)}>Edit</Button>
                  <Button size="sm" variant="danger" onClick={() => handleDelete(m._id)}>
                    Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      <Modal show={editModal} onHide={() => setEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Member</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editMember && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  value={editMember.category}
                  onChange={(e) =>
                    setEditMember({ ...editMember, category: e.target.value })
                  }
                >
                  <option value="head">Head</option>
                  <option value="subhead">Subhead</option>
                  <option value="member">Member</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  value={editMember.name}
                  onChange={(e) =>
                    setEditMember({ ...editMember, name: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  value={editMember.description}
                  onChange={(e) =>
                    setEditMember({ ...editMember, description: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Change Image</Form.Label>
                <Form.Control
                  type="file"
                  ref={editFileRef}
                  onChange={(e) =>
                    setEditMember({ ...editMember, image: e.target.files[0] })
                  }
                />
              </Form.Group>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setEditModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleEditSave}>Save</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminParish;
