import React from "react";

import { Navbar, NavDropdown, Nav, Container } from "react-bootstrap";

import { Link } from "react-router-dom";

import "./navigation-bar.scss";

export class NavigationBar extends React.Component {
    constructor() {
        super();

        this.state = {};
    }

    onLoggedOut = () => {
        localStorage.clear();
        window.open("/", "_self");
    };

    render() {
        const { user } = this.props;
        const movies = `/`;
        const profile = `/users/${user}`;

        return (
            <Container>
                <Navbar bg="light" collapseOnSelect fixed='top' expand="lg" variant="light" >
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav" />
                    <Container>
                        <Nav.Link as={Link} to={movies} className="link-text">
                            Movies
                        </Nav.Link>
                        <Nav.Link as={Link} to={profile} className="link-text">
                            Profile
                        </Nav.Link>
                        <Nav.Link to={'/'} onClick={this.onLoggedOut}>
                            Log Out
                        </Nav.Link>
                    </Container>
                </Navbar >
            </Container >
        );
    }
}