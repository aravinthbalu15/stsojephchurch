import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Button, Form, Modal, Card, Badge } from "react-bootstrap";
import Swal from "sweetalert2";
import "./AdminParish.css";

const API_URL = import.meta.env.VITE_API_URL;

const AdminParish = () => {
  /* ================= STATE ================= */
  const [members, setMembers] = useState([]);
  const [filterCategory, setFilterCategory] = useState("all");
  const [uploading, setUploading] = useState(false);

  // ADD FORM
  const [category, setCategory] = useState("member");
  const [nameEn, setNameEn] = useState("");
  const [nameTa, setNameTa] = useState("");
  const [descEn, setDescEn] = useState("");
  const [descTa, setDescTa] = useState("");
  const [image, setImage] = useState(null);

  // EDIT
  const [editModal, setEditModal] = useState(false);
  const [editMember, setEditMember] = useState(null);

  const addFileRef = useRef(null);
  const editFileRef = useRef(null);

  /* ================= FETCH ================= */
  const fetchMembers = async () => {
    const res = await axios.get(`${API_URL}/api/parish`);
    setMembers(res.data);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  /* ================= CREATE ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return;

    const ok = await Swal.fire({
      title: "Add Parish Member?",
      icon: "question",
      showCancelButton: true,
    });

    if (!ok.isConfirmed) return;

    const data = new FormData();
    data.append("category", category);
    data.append("name_en", nameEn);
    data.append("name_ta", nameTa);
    data.append("description_en", descEn);
    data.append("description_ta", descTa);
    data.append("image", image);

    try {
      setUploading(true);
      await axios.post(`${API_URL}/api/parish`, data);
      Swal.fire("Success", "Member added", "success");

      setCategory("member");
      setNameEn("");
      setNameTa("");
      setDescEn("");
      setDescTa("");
      setImage(null);
      if (addFileRef.current) addFileRef.current.value = "";

      fetchMembers();
    } catch {
      Swal.fire("Error", "Upload failed", "error");
    } finally {
      setUploading(false);
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    const ok = await Swal.fire({
      title: "Delete member?",
      icon: "warning",
      showCancelButton: true,
    });

    if (!ok.isConfirmed) return;

    await axios.delete(`${API_URL}/api/parish/${id}`);
    Swal.fire("Deleted", "Member removed", "success");
    fetchMembers();
  };

  /* ================= EDIT ================= */
  const openEditModal = (m) => {
    setEditMember({ ...m, image: null });
    setEditModal(true);
    if (editFileRef.current) editFileRef.current.value = "";
  };

  const handleEditSave = async () => {
    const ok = await Swal.fire({
      title: "Update member?",
      icon: "question",
      showCancelButton: true,
    });

    if (!ok.isConfirmed) return;

    const data = new FormData();
    data.append("category", editMember.category);
    data.append("name_en", editMember.name.en);
    data.append("name_ta", editMember.name.ta);
    data.append("description_en", editMember.description.en);
    data.append("description_ta", editMember.description.ta);

    if (editMember.image) {
      data.append("image", editMember.image);
    }

    await axios.put(`${API_URL}/api/parish/${editMember._id}`, data);

    Swal.fire("Updated", "Member updated", "success");
    setEditModal(false);
    fetchMembers();
  };

  /* ================= FILTER ================= */
  const filtered =
    filterCategory === "all"
      ? members
      : members.filter((m) => m.category === filterCategory);

  /* ================= UI ================= */
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Parish Management</h2>

      {/* FILTER */}
      <div className="d-flex justify-content-center gap-3 mb-4">
        {["all", "head", "subhead", "member"].map((c) => (
          <Button
            key={c}
            variant={filterCategory === c ? "primary" : "outline-primary"}
            onClick={() => setFilterCategory(c)}
          >
            {c.toUpperCase()}
          </Button>
        ))}
      </div>

      {/* ADD FORM */}
      <div className="p-4 shadow-sm mb-5">
        <h4>Add Parish Member</h4>

        <Form onSubmit={handleSubmit}>
          <Form.Select className="mb-3" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="head">Head</option>
            <option value="subhead">Subhead</option>
            <option value="member">Member</option>
          </Form.Select>

          <Form.Control className="mb-2" placeholder="Name (English)" value={nameEn} onChange={(e) => setNameEn(e.target.value)} />
          <Form.Control className="mb-2" placeholder="பெயர் (Tamil)" value={nameTa} onChange={(e) => setNameTa(e.target.value)} />
          <Form.Control className="mb-2" placeholder="Description (English)" value={descEn} onChange={(e) => setDescEn(e.target.value)} />
          <Form.Control className="mb-3" placeholder="விவரம் (Tamil)" value={descTa} onChange={(e) => setDescTa(e.target.value)} />

          <Form.Control type="file" ref={addFileRef} onChange={(e) => setImage(e.target.files[0])} required />

          <Button className="mt-3" type="submit" disabled={uploading}>
            {uploading ? "Uploading..." : "Add Member"}
          </Button>
        </Form>
      </div>

      {/* LIST */}
      <div className="row">
        {filtered.map((m) => (
          <div key={m._id} className="col-md-3 mb-4">
            <Card className="shadow-sm">
              <Card.Img src={m.imageUrl} />
              <Card.Body>
                <h5>{m.name.en}</h5>
                <p className="small">{m.description.en}</p>
                <Badge>{m.category.toUpperCase()}</Badge>

                <div className="d-flex justify-content-between mt-2">
                  <Button size="sm" onClick={() => openEditModal(m)}>Edit</Button>
                  <Button size="sm" variant="danger" onClick={() => handleDelete(m._id)}>Delete</Button>
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      {/* EDIT MODAL */}
      <Modal show={editModal} onHide={() => setEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Member</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {editMember && (
            <>
              <Form.Select
                className="mb-2"
                value={editMember.category}
                onChange={(e) =>
                  setEditMember({ ...editMember, category: e.target.value })
                }
              >
                <option value="head">Head</option>
                <option value="subhead">Subhead</option>
                <option value="member">Member</option>
              </Form.Select>

              <Form.Control className="mb-2" value={editMember.name.en}
                onChange={(e) =>
                  setEditMember({
                    ...editMember,
                    name: { ...editMember.name, en: e.target.value },
                  })
                }
              />

              <Form.Control className="mb-2" value={editMember.name.ta}
                onChange={(e) =>
                  setEditMember({
                    ...editMember,
                    name: { ...editMember.name, ta: e.target.value },
                  })
                }
              />

              <Form.Control className="mb-2" value={editMember.description.en}
                onChange={(e) =>
                  setEditMember({
                    ...editMember,
                    description: { ...editMember.description, en: e.target.value },
                  })
                }
              />

              <Form.Control className="mb-2" value={editMember.description.ta}
                onChange={(e) =>
                  setEditMember({
                    ...editMember,
                    description: { ...editMember.description, ta: e.target.value },
                  })
                }
              />

              <Form.Control
                type="file"
                ref={editFileRef}
                onChange={(e) =>
                  setEditMember({ ...editMember, image: e.target.files[0] })
                }
              />
            </>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={handleEditSave}>Save</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminParish;
