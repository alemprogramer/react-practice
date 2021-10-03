import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Col, Container, Row } from 'react-bootstrap';
import './App.css';

function App() {
  return (
    <Container className='mt-5'>
      <Row className='justify-content-center'>
        <Col md={6}>
          <Card>
            <Card.Header>Custom Image DropBox</Card.Header>
            <Card.Body>
              
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
