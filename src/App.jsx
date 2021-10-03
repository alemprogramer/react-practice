import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Col, Container, Form, Row, Button } from 'react-bootstrap';
import './App.css';
import Uploader from "./uploader/Uploader";
// import Viewer from "./uploader/Viewer";

function App() {
  return (
    <Container className='mt-5'>
      <Row className='justify-content-center'>
        <Col md={6}>
          <Card>
            <Card.Header>Custom Image DropBox</Card.Header>
            <Card.Body>
              <Form action='' encType="multipart/form-data">
                <Uploader/>
                {/*<Viewer/>*/}
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
