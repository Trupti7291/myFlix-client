import React, { useState } from "react";
<<<<<<< HEAD
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FormGroup } from "react-bootstrap";
=======
import axios from "axios";
import { Form, Button } from 'react-bootstrap';
import { MutedLink, BoldLink } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";

import { connect } from "react-redux";

import './login-view.scss';
>>>>>>> myFlix-client

export function LoginView(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        /* Send a request to the server for authentication */
<<<<<<< HEAD
        /* then call props.onLoggedIn(username) */
        props.onLoggedIn(username);
    }
    return (
        <form>
            <Form.Group controlId="formUsername">
                <Form.Label>Username: </Form.Label>
                <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="fromPassword">
                <Form.Label>Password:  </Form.Label>
                <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
                Submit
            </Button>
        </form>
=======
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
                    <Button className="signup-button" variant="primary" type="submit" href="http://localhost:1234/register">Sign up</Button>
                </Form>
            </Col>
        </Row>
    </Container>
>>>>>>> myFlix-client
    );
}

const mapDispatchToProps = (dispatch) => ({
    handleSubmit: (username, password) => dispatch(handleSubmit(username, password))
});

export default connect(null, mapDispatchToProps)(LoginView);