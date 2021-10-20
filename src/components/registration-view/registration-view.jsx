import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Navbar } from "react-bootstrap";

export function RegistrationView(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthdate, setBirthdate] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password, email, birthdate);
        props.onRegister(username);
    };

    return (
        <Container>
            <Row className="main-view justify-content-md-center">
                <Col md={8}>
                    <Navbar bg="dodgerblue">
                        <Form>
                            <Form.Group controlId="formUsername">
                                <Form.Label>Username: </Form.Label>
                                <Form.Control type="text" onChange={e => setUsername(e.target.value)} required placeholder="Enter Username" />
                            </Form.Group>
                            <Form.Group controlId="formPassword">
                                <Form.Label>Password: </Form.Label>
                                <Form.Control type="password" onChange={e => setPassword(e.target.value)} minLength="6" placeholder="Your password must contain min 8 characters" />
                            </Form.Group>
                            <Form.Group controlId="formEmail">
                                <Form.Label>Email: </Form.Label>
                                <Form.Control type="email" onChange={e => setEmail(e.target.value)} required placeholder="Enter your Email address" />
                            </Form.Group>
                            <Form.Group controlId="formBirthdate">
                                <Form.Label>Birthdate: </Form.Label>
                                <Form.Control type="date" onChange={e => setBirthdate(e.target.value)} required placeholder="YYYY/MM/DD" />
                            </Form.Group>
                            <Button variant="primary" type="submit" onClick={handleSubmit}> Sign up </Button>
                        </Form>
                    </Navbar>
                </Col>
            </Row>
        </Container>
    );
}