import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button, Form, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";

const API = import.meta.env.VITE_API_URL + "/api/president";
const sections = ["head", "bishop", "parishPriest"];

const AdminPresident = () => {
  const [data, setData] = useState(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  // ============================
  // FETCH DATA
  // ============================
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API);
      setData(res.data);
    } catch (err) {
      Swal.fire("Error", "Failed to load data", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ============================
  // HANDLE TEXT CHANGE
  // ============================
  const handleChange = (sec, field, lang, value) => {
    setData((prev) => ({
      ...prev,
      [sec]: {
        ...prev[sec],
        [field]: {
          ...prev[sec][field],
          [lang]: value,
        },
      },
    }));
  };

  // ============================
  // HANDLE IMAGE UPLOAD
  // ============================
  const handleImage = (sec, file) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setData((prev) => ({
        ...prev,
        [sec]: {
          ...prev[sec],
          image: reader.result,
        },
      }));
    };
    reader.readAsDataURL(file);
  };

  // ============================
  // DELETE IMAGE
  // ============================
  const deleteImage = async (sec) => {
    const res = await Swal.fire({
      title: "Remove image?",
      text: "Only the image will be removed",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, remove",
    });

    if (!res.isConfirmed) return;

    setData((prev) => ({
      ...prev,
      [sec]: {
        ...prev[sec],
        image: "",
      },
    }));

    Swal.fire("Removed!", "Image removed successfully", "success");
  };

  // ============================
  // SAVE ALL CHANGES
  // ============================
  const handleSave = async () => {
    try {
      setSaving(true);

      Swal.fire({
        title: "Saving...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      await axios.put(API, data);
      await fetchData();

      Swal.fire("Success", "Updated successfully", "success");
    } catch (error) {
      Swal.fire("Error", "Update failed", "error");
    } finally {
      setSaving(false);
    }
  };

  // ============================
  // DELETE FULL SECTION
  // ============================
  const deleteSection = async (sec) => {
    const res = await Swal.fire({
      title: "Delete section?",
      text: "This will remove all text and image",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete",
    });

    if (!res.isConfirmed) return;

    await axios.delete(`${API}/section/${sec}`);
    await fetchData();

    Swal.fire("Deleted!", "Section deleted successfully", "success");
  };

  // ============================
  // LOADING UI
  // ============================
  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  // ============================
  // UI
  // ============================
  return (
    <Container className="py-4">
      <h2 className="text-center mb-4">President Management</h2>

      {sections.map((sec) => (
        <Card key={sec} className="mb-4 shadow-sm">
          <Card.Header className="d-flex justify-content-between align-items-center">
            <strong className="text-capitalize">
              {sec.replace(/([A-Z])/g, " $1")}
            </strong>
            <Button variant="danger" size="sm" onClick={() => deleteSection(sec)}>
              Delete Section
            </Button>
          </Card.Header>

          <Card.Body>
            <Row>
              {/* IMAGE */}
              <Col md={4} className="text-center">
                <img
                  src={data?.[sec]?.image || "/placeholder.jpg"}
                  alt="Preview"
                  className="img-fluid rounded mb-2"
                  style={{ maxHeight: "200px", objectFit: "cover" }}
                />

                <Form.Control
                  type="file"
                  accept="image/*"
                  className="mb-2"
                  onChange={(e) => handleImage(sec, e.target.files[0])}
                />

                {data?.[sec]?.image && (
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => deleteImage(sec)}
                  >
                    Remove Image
                  </Button>
                )}
              </Col>

              {/* TEXT INPUTS */}
              <Col md={8}>
                {[
                  "name",
                  "description1",
                  "description2",
                  "description3",
                ].map((field) => (
                  <Row key={field}>
                    <Col md={6}>
                      <Form.Control
                        className="mb-2"
                        placeholder={`${field} (EN)`}
                        value={data?.[sec]?.[field]?.en || ""}
                        onChange={(e) =>
                          handleChange(sec, field, "en", e.target.value)
                        }
                      />
                    </Col>

                    <Col md={6}>
                      <Form.Control
                        className="mb-2"
                        placeholder={`${field} (TA)`}
                        value={data?.[sec]?.[field]?.ta || ""}
                        onChange={(e) =>
                          handleChange(sec, field, "ta", e.target.value)
                        }
                      />
                    </Col>
                  </Row>
                ))}
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}

      <div className="text-center">
        <Button onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save All Changes"}
        </Button>
      </div>
    </Container>
  );
};

export default AdminPresident;
