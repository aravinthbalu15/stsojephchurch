import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import '../Style/Announcement.css';

// Set worker source
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const Announcement = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:9000/api/announcements')
      .then((res) => setAnnouncements(res.data))
      .catch((err) => console.error('Fetch error:', err));
  }, []);

  return (
    <div className="container announcement">
      <h2 className="text-center mb-4">📢 Announcements</h2>
      <Row>
        {announcements.map((item) => (
          <Col md={12} key={item._id} className="mb-5">
            <Card className="shadow-sm p-3">
              <Card.Body>
                <h4 className="text-center mb-3">{item.title}</h4>

                {item.fileType.includes('image') ? (
                  <img
                    src={item.fileUrl}
                    alt={item.title}
                    className="img-fluid rounded mb-3"
                  />
                ) : item.fileType.includes('video') ? (
                  <video
                    controls
                    width="100%"
                    className="rounded mb-3"
                    src={item.fileUrl}
                  ></video>
                ) : item.fileType.includes('pdf') ? (
                  <div className="pdf-preview mb-3">
                    <a href={item.fileUrl} target="_blank" rel="noreferrer">
                      <Card className="text-center shadow-sm">
                        <Card.Body>
                          <h5>📄 View PDF</h5>
                          <Document file={item.fileUrl} loading="Loading PDF...">
                            <Page pageNumber={1} width={200} />
                          </Document>
                        </Card.Body>
                      </Card>
                    </a>
                  </div>
                ) : (
                  <a href={item.fileUrl} target="_blank" rel="noreferrer">
                    <Button variant="link" className="text-primary">
                      📁 Download File
                    </Button>
                  </a>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Announcement;
