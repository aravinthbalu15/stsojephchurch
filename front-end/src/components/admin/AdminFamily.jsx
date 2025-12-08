import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AdminFamily.css";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const AdminFamily = () => {
  const [stats, setStats] = useState({ families: "", anbiyams: "" });

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/family`)
      .then((res) => {
        if (res.data) setStats(res.data);
      })
      .catch(() => console.error("Error loading family data"));
  }, []);

  const handleInputChange = (e) => {
    setStats({ ...stats, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${API_BASE_URL}/api/family`, stats);
      Swal.fire("Updated!", "Family stats updated successfully!", "success");
    } catch (error) {
      Swal.fire("Error!", "Failed to update data", "error");
    }
  };

  return (
    <div className="admin-familycount container mt-5 mb-5 admin-familycount">
      <div className="shadow-lg p-4">
        <h2 className="text-center mb-4 fw-bold">Update Family & Anbiyam Count</h2>

        <div className="mb-3">
          <label className="form-label fw-semibold">Families Count</label>
          <input
            type="number"
            name="families"
            className="form-control form-control-lg"
            value={stats.families}
            onChange={handleInputChange}
            placeholder="Enter Total Families"
          />
        </div>

        <div className="mb-4">
          <label className="form-label fw-semibold">Anbiyams Count</label>
          <input
            type="number"
            name="anbiyams"
            className="form-control form-control-lg"
            value={stats.anbiyams}
            onChange={handleInputChange}
            placeholder="Enter Total Anbiyams"
          />
        </div>

        <button className="btn btn-primary btn-lg w-100" onClick={handleUpdate}>
          Update
        </button>
      </div>
    </div>
  );
};

export default AdminFamily;
