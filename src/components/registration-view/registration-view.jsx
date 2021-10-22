import React, { useState } from "react";
import axios from "axios";
import propTypes from "prop-types"
import { Form, Button, Container, Row, Col } from "react-bootstrap";

export function RegistrationView(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthdate, setBirthdate] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://my-flixapp.herokuapp.com/users', {
            Username: username,
            Password: password,
            Email: email,
            Birthdate: birthdate
        }).then(response => {
            const data = response.data;
            console.log(data);
            window.open("/", "_self"); // the second argument '_self' is necessary so that the page will open in the current tab
        }).catch(error => {
            console.log("error registering the user")
        });
        // props.onRegister(username);
    };

    return (
        <Container>
            <Row className="main-view justify-content-md-center">
                <Col md={8}>
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
                            <Form.Control type="date" onChange={e => setBirthdate(e.target.value)} required placeholder="yyyy.mm.dd" />
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={handleSubmit}> Sign up </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}