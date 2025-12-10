import React, { useState } from "react";
import {
  Form,
  Button,
  Card,
  Container,
  Alert,
  Spinner,
  Row,
  Col,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AdminLogin.css";

const API_URL = import.meta.env.VITE_API_URL;

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await axios.post(`${API_URL}/api/admin/login`, {
        email,
        password,
      });

      if (res.data?.token) {
        localStorage.setItem("adminToken", res.data.token);
        navigate("/admin-dash");
      } else {
        setError("Unexpected server response.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    }

    setLoading(false);
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center min-vh-100 bg-light"
    >
      <Row className="w-100 justify-content-center px-3">
        <Col xs={12} sm={10} md={6} lg={4}>
          <Card className="p-4 shadow-lg rounded-4 border-0">
            <Card.Body>
              <h2 className="text-center mb-4 fw-bold">Admin Login</h2>

              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                {/* Email */}
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter admin email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="py-2"
                    required
                  />
                </Form.Group>

                {/* Password */}
                <Form.Group className="mb-4">
                  <Form.Label className="fw-semibold">Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="py-2"
                    required
                  />
                </Form.Group>

                {/* Button */}
                <Button
                  type="submit"
                  className="adminlogin-btn w-100 py-2 fw-semibold rounded-3"
                  variant="primary"
                  disabled={loading}
                >
                  {loading ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    "Login"
                  )}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminLogin;
