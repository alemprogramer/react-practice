import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Card,
    Col,
    Container,
    Form,
    Row,
    Button
} from 'react-bootstrap';
import './App.css';
import Upload from "./drag-n-drop/upload";

function App() {
    const [uploads,
        setUploads] = useState({
          images:[]
        })
    const submission = (s) => {
        s.preventDefault()
    }
    const childData=(d)=>{
      setUploads({ ...uploads, images: d})
    }
    return (
        <Container className='mt-5'>
            <Row className='justify-content-center'>
                <Col md={6}>
                    <Card>
                        <Card.Header>Custom Image DropBox</Card.Header>
                        <Card.Body>
                            <Form action='' onSubmit={submission} encType="multipart/form-data">
                              <Upload many pushUp={childData} accept=".jpg,.png,.jpeg" multiple />
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
