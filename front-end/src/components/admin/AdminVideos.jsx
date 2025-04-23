import React, { useEffect, useState } from 'react';
import { Container, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import './AdminVideos.css';

const AdminVideos = () => {
  const [title, setTitle] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [videos, setVideos] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const res = await axios.get('http://localhost:9000/api/videos');
      setVideos(res.data);
    } catch (err) {
      console.error('Error fetching videos:', err);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!title || !videoFile) {
      Swal.fire('Missing Fields', 'Please fill in all fields.', 'warning');
      return;
    }

    const confirm = await Swal.fire({
      title: 'Upload Video?',
      text: 'Are you sure you want to upload this video?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, Upload',
    });

    if (!confirm.isConfirmed) return;

    const formData = new FormData();
    formData.append('title', title);
    formData.append('video', videoFile);

    setUploading(true);
    try {
      const res = await axios.post(
        'http://localhost:9000/api/videos/upload-video',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      setVideos([res.data.video, ...videos]);
      setTitle('');
      setVideoFile(null);

      Swal.fire('✅ Success', 'Video uploaded successfully!', 'success');
    } catch (err) {
      console.error('Error uploading video:', err);
      Swal.fire('❌ Error', 'Upload failed.', 'error');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Delete Video?',
      text: 'Are you sure you want to delete this video?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete',
    });

    if (!confirm.isConfirmed) return;

    try {
      await axios.delete(`http://localhost:9000/api/videos/delete-video/${id}`);
      setVideos(videos.filter((v) => v._id !== id));
      Swal.fire('Deleted!', 'Video has been deleted.', 'success');
    } catch (err) {
      console.error('Error deleting video:', err);
      Swal.fire('❌ Error', 'Deletion failed.', 'error');
    }
  };

  return (
    <div className="container admin-upload-image py-5">
      <h2 className="text-center mb-4">Upload Video</h2>
      <form onSubmit={handleUpload}>
        <div className="form-group mb-3">
          <label>Video Title:</label>
          <input
            className="form-control"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>Select Video:</label>
          <input
            className="form-control"
            type="file"
            accept="video/*"
            onChange={(e) => setVideoFile(e.target.files[0])}
            required
          />
        </div>
        <Button type="submit" variant="primary" disabled={uploading}>
          {uploading ? <Spinner animation="border" size="sm" /> : 'Upload'}
        </Button>
      </form>

      <h3 className="text-center mt-5">Uploaded Videos</h3>
      <div className="row mt-4">
        {videos.map((video) => (
          <div key={video._id} className="col-sm-6 col-md-4 mb-4">
            <div className="gallery-card p-2 border rounded shadow-sm">
              <video
                controls
                width="100%"
                style={{ height: '200px', objectFit: 'cover' }}
              >
                <source src={video.secure_url} type="video/mp4" />
                Your browser does not support the video tag.
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
