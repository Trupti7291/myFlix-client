import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from 'react-bootstrap';
import { Container, Row, Col } from "react-bootstrap";
import './login-view.scss';

export function LoginView(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        /* Send a request to the server for authentication */
        axios.post('https://my-flixapp.herokuapp.com/login', {
            Username: username,
            Password: password
        }).then(response => {
            const data = response.data;
            props.onLoggedIn(data);
        }).catch(error => {
            console.log('User not found');
        });
    };
    return (<Container>
        <Row className="main-view justify-content-md-center">
            <Col md={8}>
                <Form>
                    <Form.Group controlId="formUsername">
                        <Form.Label>Username: </Form.Label>
                        <Form.Control type="text" onChange={e => setUsername(e.target.value)} required placeholder="Enter Username" />
                    </Form.Group>
                    <Form.Group controlId="formPassword">
                        <Form.Label>Password: </Form.Label>
                        <Form.Control type="password" onChange={e => setPassword(e.target.value)} required placeholder="Enter Password" />
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={handleSubmit}> Log in </Button>
                </Form>
            </Col>
        </Row>
    </Container>
    );
}