import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AdminAnbiyangal.css"

const API_URL = `${import.meta.env.VITE_API_URL}/api/anbiyam`;
const AdminAnbiyam = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);

  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const fetchGroups = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setGroups(res.data || []);
    } catch (err) {
      Swal.fire("Error", "Failed to load Anbiyam data", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const handleFieldChange = (index, field, value) => {
    const updated = [...groups];
    updated[index] = { ...updated[index], [field]: value };
    setGroups(updated);
  };

  const handleMainImageChange = async (index, file) => {
    if (!file) return;
    const base64 = await fileToBase64(file);
    const updated = [...groups];
    updated[index] = {
      ...updated[index],
      mainImage: base64,
      mainImageUrl: base64,
    };
    setGroups(updated);
  };

  const handleMemberChange = (groupIndex, memberIndex, field, value) => {
    const updated = [...groups];
    const group = { ...updated[groupIndex] };
    const members = [...(group.members || [])];

    members[memberIndex] = { ...members[memberIndex], [field]: value };
    group.members = members;
    updated[groupIndex] = group;
    setGroups(updated);
  };

  const handleMemberImageChange = async (groupIndex, memberIndex, file) => {
    if (!file) return;
    const base64 = await fileToBase64(file);
    const updated = [...groups];
    const group = { ...updated[groupIndex] };
    const members = [...(group.members || [])];

    members[memberIndex] = {
      ...members[memberIndex],
      image: base64,
      imageUrl: base64,
    };

    group.members = members;
    updated[groupIndex] = group;
    setGroups(updated);
  };

  const handleAddGroup = () => {
    const nextNumber =
      groups.length > 0
        ? Math.max(...groups.map((g) => g.groupNumber || 0)) + 1
        : 1;

    setGroups([
      ...groups,
      {
        groupNumber: nextNumber,
        groupTitle: "",
        mainTitle: "",
        mainDescription: "",
        mainImageUrl: "",
        mainImage: "",
        members: [],
      },
    ]);
  };

  const handleAddMember = (groupIndex) => {
    const updated = [...groups];
    updated[groupIndex].members = [
      ...(updated[groupIndex].members || []),
      { name: "", role: "", description: "", imageUrl: "", image: "" },
    ];
    setGroups(updated);
  };

  const handleRemoveMember = (groupIndex, memberIndex) => {
    const updated = [...groups];
    updated[groupIndex].members = updated[groupIndex].members.filter(
      (_, idx) => idx !== memberIndex
    );
    setGroups(updated);
  };

  const handleSave = async (index) => {
    const g = groups[index];

    const payload = {
      groupNumber: g.groupNumber,
      groupTitle: g.groupTitle,
      mainTitle: g.mainTitle,
      mainDescription: g.mainDescription,
      mainImage: g.mainImage || g.mainImageUrl || "",
      members: (g.members || []).map((m) => ({
        _id: m._id,
        name: m.name,
        role: m.role,
        description: m.description,
        image: m.image || m.imageUrl || "",
        imageUrl: m.imageUrl,
        cloudinaryId: m.cloudinaryId,
      })),
    };

    try {
      if (g._id) {
        await axios.put(`${API_URL}/${g._id}`, payload);
        Swal.fire("Success", "Anbiyam Updated", "success");
      } else {
        await axios.post(API_URL, payload);
        Swal.fire("Success", "Anbiyam Created", "success");
      }
      fetchGroups();
    } catch (err) {
      Swal.fire("Error", "Failed to save Anbiyam", "error");
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      Swal.fire("Deleted", "Anbiyam removed", "success");
      fetchGroups();
    } catch (err) {
      Swal.fire("Error", "Failed to delete", "error");
    }
  };

  return (
    <div className="admin-anbiyam container mt-4 mb-5">
      <h2 className="text-center fw-bold mb-4">Admin – Anbiyam Management</h2>

      <div className="text-end mb-3">
        <button className="btn btn-success" onClick={handleAddGroup}>
          + Add New Anbiyam
        </button>
      </div>

      {loading && <p>Loading...</p>}

      {groups.map((g, index) => (
        <div className="card p-3 shadow mb-4" key={g._id || index}>
          <div className="d-flex justify-content-between mb-2">
            <h5>அன்பியம் – {g.groupNumber}</h5>
            {g._id && (
              <button
                className="btn btn-sm btn-danger"
                onClick={() => handleDelete(g._id)}
              >
                Delete
              </button>
            )}
          </div>

          {/* BASIC FIELDS */}
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Group Title"
            value={g.groupTitle}
            onChange={(e) =>
              handleFieldChange(index, "groupTitle", e.target.value)
            }
          />

          <input
            type="text"
            className="form-control mb-2"
            placeholder="Main Title"
            value={g.mainTitle}
            onChange={(e) =>
              handleFieldChange(index, "mainTitle", e.target.value)
            }
          />

          <textarea
            className="form-control mb-3"
            placeholder="Main Description"
            rows="3"
            value={g.mainDescription}
            onChange={(e) =>
              handleFieldChange(index, "mainDescription", e.target.value)
            }
          />

          {/* IMAGE Upload */}
          <div className="row mb-3">
            <div className="col-md-6">
              <input
                type="file"
                className="form-control"
                onChange={(e) => handleMainImageChange(index, e.target.files[0])}
              />
            </div>
            <div className="col-md-6">
              {g.mainImageUrl && (
                <img
                  src={g.mainImageUrl}
                  alt="Main"
                  className="img-fluid rounded"
                  style={{ height: "180px", objectFit: "cover" }}
                />
              )}
            </div>
          </div>

          {/* MEMBERS */}
          <h6 className="fw-bold mt-2">Members</h6>

          {g.members.map((m, memberIndex) => (
            <div className="border rounded p-3 mb-2" key={memberIndex}>
              <div className="row">
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Name"
                    value={m.name}
                    onChange={(e) =>
                      handleMemberChange(
                        index,
                        memberIndex,
                        "name",
                        e.target.value
                      )
                    }
                  />
                </div>

                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Role"
                    value={m.role}
                    onChange={(e) =>
                      handleMemberChange(
                        index,
                        memberIndex,
                        "role",
                        e.target.value
                      )
                    }
                  />
                </div>

                <div className="col-md-4">
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) =>
                      handleMemberImageChange(
                        index,
                        memberIndex,
                        e.target.files[0]
                      )
                    }
                  />
                </div>
              </div>

              <textarea
                className="form-control mt-2"
                placeholder="Description"
                rows="2"
                value={m.description}
                onChange={(e) =>
                  handleMemberChange(
                    index,
                    memberIndex,
                    "description",
                    e.target.value
                  )
                }
              />

              {m.imageUrl && (
                <img
                  src={m.imageUrl}
                  className="rounded-circle mt-2"
                  width="80"
                  height="80"
                  style={{ objectFit: "cover" }}
                />
              )}

              <button
                className="btn btn-sm btn-danger mt-2"
                onClick={() => handleRemoveMember(index, memberIndex)}
              >
                Remove Member
              </button>
            </div>
          ))}

          <div className="d-flex justify-content-between mt-3">
            <button
              className="btn btn-outline-primary"
              onClick={() => handleAddMember(index)}
            >
              + Add Member
            </button>

            <button className="btn btn-success" onClick={() => handleSave(index)}>
              Save
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminAnbiyam;
