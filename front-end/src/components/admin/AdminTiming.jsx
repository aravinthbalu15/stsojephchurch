import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AdminTiming.css";

const API_URL = import.meta.env.VITE_API_URL;   // ⭐ COMMON BASE URL

const AdminVisitingTime = () => {
  const [regularDays, setRegularDays] = useState({
    mondayToFriday: "",
    saturday: "",
    sunday: "",
  });

  const [massTimings, setMassTimings] = useState({
    weekdays: [],
    sunday: [],
  });

  const [visitingTimeData, setVisitingTimeData] = useState(null);

  const fetchVisitingTime = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/visiting-time`);
      setVisitingTimeData(res.data);

      if (res.data) {
        setRegularDays(res.data.regularDays);
        setMassTimings(res.data.massTimings);
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error!", "Failed to fetch visiting time data.", "error");
    }
  };

  useEffect(() => {
    fetchVisitingTime();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (visitingTimeData && visitingTimeData._id) {
        await axios.put(`${API_URL}/api/visiting-time/${visitingTimeData._id}`, {
          regularDays,
          massTimings,
        });

        Swal.fire("Updated!", "Visiting time updated successfully!", "success");
      } else {
        await axios.post(`${API_URL}/api/visiting-time`, {
          regularDays,
          massTimings,
        });

        Swal.fire("Created!", "Visiting time created successfully!", "success");
      }

      fetchVisitingTime();
    } catch (error) {
      console.error(error);
      Swal.fire("Error!", "Something went wrong while saving.", "error");
    }
  };

  const handleDelete = async () => {
    try {
      if (visitingTimeData && visitingTimeData._id) {
        await axios.delete(`${API_URL}/api/visiting-time/${visitingTimeData._id}`);

        Swal.fire("Deleted!", "Visiting time deleted successfully!", "success");

        setRegularDays({ mondayToFriday: "", saturday: "", sunday: "" });
        setMassTimings({ weekdays: [], sunday: [] });
        setVisitingTimeData(null);
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error!", "Failed to delete visiting time.", "error");
    }
  };

  return (
    <div className="container vt-time mt-5">
      <h2 className="text-center mb-4">Admin Visiting Time</h2>

      <form onSubmit={handleSubmit}>
        <h5>Regular Days:</h5>

        <input
          type="text"
          className="form-control mb-2"
          placeholder="Ex: 5:30 AM - 7:30 PM"
          value={regularDays.mondayToFriday}
          onChange={(e) =>
            setRegularDays({ ...regularDays, mondayToFriday: e.target.value })
          }
        />

        <input
          type="text"
          className="form-control mb-2"
          placeholder="Ex: 6:00 AM - 8:00 PM"
          value={regularDays.saturday}
          onChange={(e) =>
            setRegularDays({ ...regularDays, saturday: e.target.value })
          }
        />

        <input
          type="text"
          className="form-control mb-2"
          placeholder="Ex: 7:00 AM - 9:00 PM"
          value={regularDays.sunday}
          onChange={(e) =>
            setRegularDays({ ...regularDays, sunday: e.target.value })
          }
        />

        <h5>Mass Timings:</h5>

        <input
          type="text"
          className="form-control mb-2"
          placeholder="Ex: 6:00 AM, 7:00 AM, 6:30 PM"
          value={massTimings.weekdays.join(",")}
          onChange={(e) =>
            setMassTimings({ ...massTimings, weekdays: e.target.value.split(",") })
          }
        />

        <input
          type="text"
          className="form-control mb-2"
          placeholder="Ex: 7:00 AM, 9:00 AM, 6:00 PM"
          value={massTimings.sunday.join(",")}
          onChange={(e) =>
            setMassTimings({ ...massTimings, sunday: e.target.value.split(",") })
          }
        />

        <div className="d-flex gap-3 mt-3">
          <button type="submit" className="btn btn-success">Save</button>

          {visitingTimeData && (
            <button type="button" className="btn btn-danger" onClick={handleDelete}>
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AdminVisitingTime;
