import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AdminAnbiyangal.css";

const API_URL = `${import.meta.env.VITE_API_URL}/api/anbiyam`;

const AdminAnbiyam = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ---------- FILE TO BASE64 ---------- */
  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  /* ---------- FETCH ---------- */
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

  /* ---------- GROUP FIELD CHANGE ---------- */
  const handleFieldChange = (index, field, lang, value) => {
    const updated = [...groups];
    updated[index] = {
      ...updated[index],
      [field]: {
        ...(updated[index][field] || { en: "", ta: "" }),
        [lang]: value,
      },
    };
    setGroups(updated);
  };

  /* ---------- MAIN IMAGE ---------- */
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

  /* ---------- MEMBER FIELD ---------- */
  const handleMemberChange = (
    groupIndex,
    memberIndex,
    field,
    lang,
    value
  ) => {
    const updated = [...groups];
    const members = [...updated[groupIndex].members];

    members[memberIndex] = {
      ...members[memberIndex],
      [field]: {
        ...(members[memberIndex][field] || { en: "", ta: "" }),
        [lang]: value,
      },
    };

    updated[groupIndex].members = members;
    setGroups(updated);
  };

  /* ---------- MEMBER IMAGE ---------- */
  const handleMemberImageChange = async (groupIndex, memberIndex, file) => {
    if (!file) return;
    const base64 = await fileToBase64(file);

    const updated = [...groups];
    updated[groupIndex].members[memberIndex] = {
      ...updated[groupIndex].members[memberIndex],
      image: base64,
      imageUrl: base64,
    };
    setGroups(updated);
  };

  /* ---------- ADD GROUP ---------- */
  const handleAddGroup = () => {
    const nextNumber =
      groups.length > 0
        ? Math.max(...groups.map((g) => g.groupNumber || 0)) + 1
        : 1;

    setGroups([
      ...groups,
      {
        groupNumber: nextNumber,
        groupTitle: { en: "", ta: "" },
        mainTitle: { en: "", ta: "" },
        mainDescription: { en: "", ta: "" },
        mainImageUrl: "",
        mainImage: "",
        members: [],
      },
    ]);
  };

  /* ---------- ADD MEMBER ---------- */
  const handleAddMember = (groupIndex) => {
    const updated = [...groups];
    updated[groupIndex].members.push({
      name: { en: "", ta: "" },
      role: { en: "", ta: "" },
      description: { en: "", ta: "" },
      imageUrl: "",
      image: "",
    });
    setGroups(updated);
  };

  /* ---------- REMOVE MEMBER ---------- */
  const handleRemoveMember = (groupIndex, memberIndex) => {
    const updated = [...groups];
    updated[groupIndex].members = updated[groupIndex].members.filter(
      (_, i) => i !== memberIndex
    );
    setGroups(updated);
  };

  /* ---------- SAVE ---------- */
  const handleSave = async (index) => {
    const g = groups[index];

    const payload = {
      groupNumber: g.groupNumber,
      groupTitle: g.groupTitle,
      mainTitle: g.mainTitle,
      mainDescription: g.mainDescription,
      mainImage: g.mainImage || g.mainImageUrl || "",
      members: g.members.map((m) => ({
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

  // /* ---------- DELETE ---------- */
  // const handleDelete = async (id) => {
  //   const confirm = await Swal.fire({
  //     title: "Delete?",
  //     text: "This action cannot be undone",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonText: "Yes, Delete",
  //   });

  //   if (!confirm.isConfirmed) return;

  //   try {
  //     await axios.delete(`${API_URL}/${id}`);
  //     Swal.fire("Deleted", "Anbiyam removed", "success");
  //     fetchGroups();
  //   } catch (err) {
  //     Swal.fire("Error", "Failed to delete", "error");
  //   }
  // };

  /* ---------- UI ---------- */
  return (
    <div className="admin-anbiyam container mt-4 mb-5">
      <h2 className="text-center fw-bold mb-4">
        Admin – Anbiyam Management
      </h2>

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
            {/* {g._id && (
              <button
                className="btn btn-sm btn-danger"
                onClick={() => handleDelete(g._id)}
              >
                Delete
              </button>
            )
            } */}
          </div>

          {/* GROUP TITLE */}
          <input
            className="form-control mb-2"
            placeholder="Group Title (English)"
            value={g.groupTitle?.en || ""}
            onChange={(e) =>
              handleFieldChange(index, "groupTitle", "en", e.target.value)
            }
          />

          <input
            className="form-control mb-2"
            placeholder="Group Title (Tamil)"
            value={g.groupTitle?.ta || ""}
            onChange={(e) =>
              handleFieldChange(index, "groupTitle", "ta", e.target.value)
            }
          />

          {/* MAIN TITLE */}
          <input
            className="form-control mb-2"
            placeholder="Main Title (English)"
            value={g.mainTitle?.en || ""}
            onChange={(e) =>
              handleFieldChange(index, "mainTitle", "en", e.target.value)
            }
          />

          <input
            className="form-control mb-2"
            placeholder="Main Title (Tamil)"
            value={g.mainTitle?.ta || ""}
            onChange={(e) =>
              handleFieldChange(index, "mainTitle", "ta", e.target.value)
            }
          />

          {/* DESCRIPTION */}
          <textarea
            className="form-control mb-2"
            placeholder="Description (English)"
            value={g.mainDescription?.en || ""}
            onChange={(e) =>
              handleFieldChange(index, "mainDescription", "en", e.target.value)
            }
          />

          <textarea
            className="form-control mb-3"
            placeholder="Description (Tamil)"
            value={g.mainDescription?.ta || ""}
            onChange={(e) =>
              handleFieldChange(index, "mainDescription", "ta", e.target.value)
            }
          />

          {/* MAIN IMAGE */}
          <input
            type="file"
            className="form-control mb-2"
            onChange={(e) => handleMainImageChange(index, e.target.files[0])}
          />

          {g.mainImageUrl && (
            <img
              src={g.mainImageUrl}
              className="img-fluid rounded mb-3"
              style={{ height: "180px", objectFit: "cover" }}
            />
          )}

          {/* MEMBERS */}
          <h6 className="fw-bold">Members</h6>

          {g.members.map((m, mi) => (
            <div className="border p-3 mb-2" key={mi}>
              <input
                className="form-control mb-1"
                placeholder="Name (English)"
                value={m.name?.en || ""}
                onChange={(e) =>
                  handleMemberChange(index, mi, "name", "en", e.target.value)
                }
              />

              <input
                className="form-control mb-1"
                placeholder="Name (Tamil)"
                value={m.name?.ta || ""}
                onChange={(e) =>
                  handleMemberChange(index, mi, "name", "ta", e.target.value)
                }
              />

              <input
                className="form-control mb-1"
                placeholder="Role (English)"
                value={m.role?.en || ""}
                onChange={(e) =>
                  handleMemberChange(index, mi, "role", "en", e.target.value)
                }
              />

              <input
                className="form-control mb-1"
                placeholder="Role (Tamil)"
                value={m.role?.ta || ""}
                onChange={(e) =>
                  handleMemberChange(index, mi, "role", "ta", e.target.value)
                }
              />

              <textarea
                className="form-control mb-1"
                placeholder="Description (English)"
                value={m.description?.en || ""}
                onChange={(e) =>
                  handleMemberChange(
                    index,
                    mi,
                    "description",
                    "en",
                    e.target.value
                  )
                }
              />

              <textarea
                className="form-control mb-2"
                placeholder="Description (Tamil)"
                value={m.description?.ta || ""}
                onChange={(e) =>
                  handleMemberChange(
                    index,
                    mi,
                    "description",
                    "ta",
                    e.target.value
                  )
                }
              />

              <input
                type="file"
                className="form-control mb-2"
                onChange={(e) =>
                  handleMemberImageChange(index, mi, e.target.files[0])
                }
              />

              {m.imageUrl && (
                <img
                  src={m.imageUrl}
                  width="80"
                  height="80"
                  className="rounded-circle"
                  style={{ objectFit: "cover" }}
                />
              )}

              <button
                className="btn btn-danger btn-sm mt-2"
                onClick={() => handleRemoveMember(index, mi)}
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

            <button
              className="btn btn-success"
              onClick={() => handleSave(index)}
            >
              Save
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminAnbiyam;
