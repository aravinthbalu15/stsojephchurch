import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AdminTiming.css";

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
      const res = await axios.get("http://localhost:9000/api/visiting-time");
      setVisitingTimeData(res.data);

      if (res.data) {
        setRegularDays(res.data.regularDays);
        setMassTimings(res.data.massTimings);
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to fetch visiting time data.",
      });
    }
  };

  useEffect(() => {
    fetchVisitingTime();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (visitingTimeData && visitingTimeData._id) {
        await axios.put(`http://localhost:9000/api/visiting-time/${visitingTimeData._id}`, {
          regularDays,
          massTimings,
        });

        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "Visiting time updated successfully!",
          toast: true,
          timer: 1500,
          showConfirmButton: false,
          position: "top-end",
        });
      } else {
        await axios.post("http://localhost:9000/api/visiting-time", {
          regularDays,
          massTimings,
        });

        Swal.fire({
          icon: "success",
          title: "Created!",
          text: "Visiting time created successfully!",
          toast: true,
          timer: 1500,
          showConfirmButton: false,
          position: "top-end",
        });
      }

      fetchVisitingTime();
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Something went wrong while saving.",
      });
    }
  };

  const handleDelete = async () => {
    try {
      if (visitingTimeData && visitingTimeData._id) {
        await axios.delete(`http://localhost:9000/api/visiting-time/${visitingTimeData._id}`);
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Visiting time deleted successfully!",
          toast: true,
          timer: 1500,
          showConfirmButton: false,
          position: "top-end",
        });

        setRegularDays({ mondayToFriday: "", saturday: "", sunday: "" });
        setMassTimings({ weekdays: [], sunday: [] });
        setVisitingTimeData(null);
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to delete visiting time.",
      });
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
