import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './AdminDashBoard.css'
const AdminDashBoard = () => {
  const navigate = useNavigate();

  const buttons = [
    { title: 'Manage Events', route: '/add-events' },
    { title: 'Manage Main Events', route: '/add-festivals' },
    { title: 'Learn & Grow', route: '/admin/events' },


    { title: 'Add Announcements', route: '/add-announcement' },
    { title: 'Add Images', route: '/add-images' },
    { title: 'Add Videos', route: '/add-videos' },
    { title: 'Add Heart Convent', route: '/add-heart-convent' },
    { title: 'Add Priest', route: '/add-priest' },
  ];

  return (
    <div className=" container admin-dash-board mt-5">
      <h2 className="text-center mb-4">📊 Admin Dashboard</h2>
      <Row className="g-4">
        {buttons.map((btn, index) => (
          <Col md={4} sm={6} xs={12} key={index}>
            <Card className="text-center shadow-sm border-0 h-100">
              <Card.Body>
                <Card.Title>{btn.title}</Card.Title>
                <Button
                  variant="primary"
                  className="mt-3"
                  onClick={() => navigate(btn.route)}
                >
                  Go to {btn.title}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default AdminDashBoard;
