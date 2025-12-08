import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Button, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";
import "./AdminVideos.css";

const API_URL = import.meta.env.VITE_API_URL; // ⭐ Back-end root URL

const AdminVideos = () => {
  const [title, setTitle] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [videos, setVideos] = useState([]);
  const [uploading, setUploading] = useState(false);

  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/videos`);
      setVideos(res.data);
    } catch (err) {
      console.error("Error fetching videos:", err);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!title || !videoFile) {
      Swal.fire("Missing Fields", "Please enter title & choose a video.", "warning");
      return;
    }

    const confirm = await Swal.fire({
      title: "Upload Video?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Upload",
    });

    if (!confirm.isConfirmed) return;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("video", videoFile);

    setUploading(true);

    try {
      await axios.post(`${API_URL}/api/videos/upload-video`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      Swal.fire("Success", "Video uploaded successfully!", "success");

      setTitle("");
      setVideoFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";

      fetchVideos();
    } catch (err) {
      console.error("Upload error:", err);
      Swal.fire("Error", "Upload failed", "error");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete Video?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axios.delete(`${API_URL}/api/videos/delete-video/${id}`);
      Swal.fire("Deleted!", "Video removed.", "success");
      fetchVideos();
    } catch (err) {
      console.error("Delete failed:", err);
      Swal.fire("Error", "Failed to delete", "error");
    }
  };

  return (
    <div className="container admin-upload-image py-5">
      <h2 className="text-center mb-4 fw-bold">Upload Video</h2>

      <form onSubmit={handleUpload}>
        <div className="form-group mb-3">
          <label>Video Title:</label>
          <input
            className="form-control"
            type="text"
            value={title}
            placeholder="Enter video title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group mb-3">
          <label>Select Video:</label>
          <input
            ref={fileInputRef}
            className="form-control"
            type="file"
            accept="video/*"
            onChange={(e) => setVideoFile(e.target.files[0])}
          />
        </div>

        <Button type="submit" variant="primary" disabled={uploading}>
          {uploading ? (
            <>
              <Spinner animation="border" size="sm" /> Uploading...
            </>
          ) : (
            "Upload"
          )}
        </Button>
      </form>

      <h3 className="text-center mt-5 fw-bold">Uploaded Videos</h3>

      <div className="row mt-4">
        {videos.map((video) => (
          <div key={video._id} className="col-sm-6 col-md-4 mb-4">
            <div className="gallery-card p-2 border rounded shadow-sm">
              <video controls width="100%" style={{ height: "200px", objectFit: "cover" }}>
                <source src={video.secure_url} type="video/mp4" />
              </video>

              <h6 className="mt-2">{video.title}</h6>

              <Button
                variant="danger"
                className="mt-2"
                onClick={() => handleDelete(video._id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminVideos;
