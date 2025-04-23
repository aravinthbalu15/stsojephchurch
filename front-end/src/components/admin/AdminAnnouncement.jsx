import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Row, Col, Spinner } from 'react-bootstrap';
import Swal from 'sweetalert2';
import axios from 'axios';
import './AdminAnnouncement.css';

const AdminAnnouncement = () => {
  const [imageTitle, setImageTitle] = useState('');
  const [file, setFile] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const res = await axios.get('http://localhost:9000/api/announcements');
      setAnnouncements(res.data);
    } catch (err) {
      console.error('Error fetching announcements:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file || !imageTitle) {
      Swal.fire('Missing Info', 'Please fill all fields before uploading.', 'warning');
      return;
    }

    if (file.size > 10485760) {
      Swal.fire('File Too Large', 'Upload file smaller than 10MB.', 'error');
      return;
    }

    const confirm = await Swal.fire({
      title: 'Upload Confirmation',
      text: 'Are you sure you want to upload this file?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, upload it!',
    });

    if (confirm.isConfirmed) {
      const formData = new FormData();
      formData.append('title', imageTitle);
      formData.append('file', file);

      try {
        const res = await axios.post('http://localhost:9000/api/announcements', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setAnnouncements([res.data, ...announcements]);
        setImageTitle('');
        setFile(null);
        Swal.fire('Success', 'File uploaded successfully!', 'success');
      } catch (err) {
        console.error('Upload failed:', err);
        Swal.fire('Error', 'Upload failed', 'error');
      }
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Delete Confirmation',
      text: 'Are you sure you want to delete this announcement?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`http://localhost:9000/api/announcements/${id}`);
        setAnnouncements(announcements.filter(item => item._id !== id));
        Swal.fire('Deleted', 'Announcement deleted successfully', 'success');
      } catch (err) {
        console.error('Delete failed:', err);
        Swal.fire('Error', 'Delete failed', 'error');
      }
    }
  };

  return (
    <div className="container admin-dash py-5">
      <h2 className="text-center mb-4">Admin Announcement Upload</h2>

      <Card className="mb-4">
        <Card.Body>
          <Form onSubmit={handleUpload}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter title"
                    value={imageTitle}
                    onChange={(e) => setImageTitle(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Upload File</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button type="submit" variant="primary">Upload</Button>
          </Form>
        </Card.Body>
      </Card>

      <Card>
        <Card.Header><strong>📢 All Announcements</strong></Card.Header>
        <Card.Body>
          {loading ? (
            <div className="text-center"><Spinner animation="border" /></div>
          ) : announcements.length === 0 ? (
            <p>No announcements yet.</p>
          ) : (
            <Row>
              {announcements.map((item) => (
                <Col md={6} lg={4} key={item._id} className="mb-4">
                  <Card className="h-100 shadow-sm">
                    <Card.Body>
                      <Card.Title>{item.title}</Card.Title>
                      <div className="announcement-preview mb-3">
                        {item.fileType?.includes('image') ? (
                          <img src={item.fileUrl} alt={item.title} className="img-fluid rounded" />
                        ) : item.fileType?.includes('video') ? (
                          <video controls width="100%" src={item.fileUrl}></video>
                        ) : item.fileType?.includes('pdf') ? (
                          <a href={item.fileUrl} target="_blank" rel="noopener noreferrer">
                            📄 View PDF
                          </a>
                        ) : (
                          <a href={item.fileUrl} target="_blank" rel="noopener noreferrer">
                            📁 Download File
                          </a>
                        )}
                      </div>
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(item._id)}
                        className="w-100"
                      >
                        Delete
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default AdminAnnouncement;
