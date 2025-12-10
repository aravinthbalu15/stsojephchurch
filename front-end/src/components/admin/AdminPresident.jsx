import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";

const API = import.meta.env.VITE_API_URL + "/api/president";

const AdminPresident = () => {
  const [data, setData] = useState(null);
  const [saving, setSaving] = useState(false);

  const sections = ["head", "bishop", "parishPriest"];

  // ============================
  // FETCH DATA
  // ============================
  const fetchData = async () => {
    const res = await axios.get(API);
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ============================
  // HANDLE TEXT CHANGE (EN/TA)
  // ============================
  const handleChange = (section, field, lang, value) => {
    setData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: {
          ...prev[section][field],
          [lang]: value,
        },
      },
    }));
  };

  // ============================
  // HANDLE IMAGE UPLOAD (BASE64)
  // ============================
  const handleImage = (section, file) => {
    const reader = new FileReader();
    reader.onload = () => {
      setData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          image: reader.result, // base64
        },
      }));
    };
    reader.readAsDataURL(file);
  };

  // ============================
  // SAVE CHANGES
  // ============================
  const handleSave = async () => {
    try {
      setSaving(true);
      await axios.put(API, data);
      fetchData();
      alert("Updated Successfully!");
    } catch (error) {
      console.log(error);
      alert("Update failed");
    } finally {
      setSaving(false);
    }
  };

  // ============================
  // DELETE SECTION
  // ============================
  const deleteSection = async (section) => {
    if (!confirm("Delete this section?")) return;

    await axios.delete(`${API}/section/${section}`);
    fetchData();
  };

  if (!data) return <p className="text-center mt-5">Loading...</p>;

  // ============================
  // UI RENDER
  // ============================
  return (
    <Container className="py-4">
      <h2 className="text-center mb-4">President Management</h2>

      {sections.map((sec) => (
        <Card className="mb-4 shadow-sm" key={sec}>
          <Card.Header className="d-flex justify-content-between align-items-center">
            <strong className="text-capitalize">{sec.replace(/([A-Z])/g, " $1")}</strong>
            <Button variant="danger" size="sm" onClick={() => deleteSection(sec)}>
              Delete Section
            </Button>
          </Card.Header>

          <Card.Body>
            <Row>
              {/* IMAGE */}
              <Col md={4} className="text-center">
                <img
                  src={data[sec].image || "/placeholder.jpg"}
                  alt="Preview"
                  className="img-fluid rounded mb-2"
                  style={{ maxHeight: "200px", objectFit: "cover" }}
                />

                <Form.Group>
                  <Form.Label>Upload Image</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImage(sec, e.target.files[0])}
                  />
                </Form.Group>
              </Col>

              {/* TEXT INPUTS */}
              <Col md={8}>
                {/* NAME */}
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Name (English)</Form.Label>
                      <Form.Control
                        value={data[sec].name.en}
                        onChange={(e) => handleChange(sec, "name", "en", e.target.value)}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Name (Tamil)</Form.Label>
                      <Form.Control
                        value={data[sec].name.ta}
                        onChange={(e) => handleChange(sec, "name", "ta", e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* DESCRIPTION 1 */}
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Description 1 (EN)</Form.Label>
                      <Form.Control
                        value={data[sec].description1.en}
                        onChange={(e) => handleChange(sec, "description1", "en", e.target.value)}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Description 1 (TA)</Form.Label>
                      <Form.Control
                        value={data[sec].description1.ta}
                        onChange={(e) => handleChange(sec, "description1", "ta", e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* DESCRIPTION 2 */}
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Description 2 (EN)</Form.Label>
                      <Form.Control
                        value={data[sec].description2.en}
                        onChange={(e) => handleChange(sec, "description2", "en", e.target.value)}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Description 2 (TA)</Form.Label>
                      <Form.Control
                        value={data[sec].description2.ta}
                        onChange={(e) => handleChange(sec, "description2", "ta", e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* DESCRIPTION 3 */}
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Description 3 (EN)</Form.Label>
                      <Form.Control
                        value={data[sec].description3.en}
                        onChange={(e) => handleChange(sec, "description3", "en", e.target.value)}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Description 3 (TA)</Form.Label>
                      <Form.Control
                        value={data[sec].description3.ta}
                        onChange={(e) => handleChange(sec, "description3", "ta", e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
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
