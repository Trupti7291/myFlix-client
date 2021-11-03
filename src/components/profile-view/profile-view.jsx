import React from "react";
import axios from "axios";
import { Form, Button, Row, Col, Card, CardGroup, Container, ListGroup, ListGroupItem } from "react-bootstrap";

import { Link } from "react-router-dom";

export class ProfileView extends React.Component {
    constructor() {
        super();
        this.state = {
            username: null,
            password: null,
            email: null,
            birthday: null,
            favoriteMovies: [],
        };
    }

    componentDidMount() {
        let accessToken = localStorage.getItem("token");
        if (accessToken !== null) {
            this.getUser(accessToken);
        }
    }

    getUser(token) {
        const username = localStorage.getItem("user");
        axios.get(`"https://my-flixapp.herokuapp.com/users/${username}`, {
            headers: { Authorization: `Bearer ${token}` },
        }).then((response) => {
            this.setState({
                Username: response.data.Username,
                Password: response.data.Password,
                Email: response.data.Email,
                Birthdate: response.data.Birthdate,
                FavoriteMovies: response.data.FavoriteMovies,
            });
        }).catch(function (error) {
            console.log(error);
        });
    }

    removeFavMovies() {
        const token = localStorage.getItem("token");
        const username = localStorage.getItem("user");

        axios.delete(`https://my-flixapp.herokuapp.com/users/${username}/movies/${movie._id}`, {
            headers: { Authorization: `Bearer ${token}` },
        }
        ).then(() => {
            alert("Movie was removed");
            this.componentDidMount();
        }).catch(function (error) {
            console.log(error);
        });
    }

    handleUpdate(e, username, password, email, birthday) {
        this.setState({
            validated: null,
        });

        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
            this.setState({
                validated: true,
            });
            return;
        }
        e.preventDefault();

        const token = localStorage.getItem("token");

        axios.put(`https://my-flixapp.herokuapp.com/users/${username}`, {
            headers: { Authorization: `Bearer ${token}` },
            data: {
                Username: newUsername ? newUsername : this.state.Username,
                Password: newPassword ? newPassword : this.state.Password,
                Email: newEmail ? newEmail : this.state.Email,
                Birthdate: newBirthdate ? newBirthdate : this.state.Birthdate,
            },
        }).then((response) => {
            alert("Saved Changes");
            this.setState({
                Username: response.data.Username,
                Password: response.data.Password,
                Email: response.data.Email,
                Birthdate: response.data.Birthdate,
            });
            localStorage.setItem("user", this.state.Username);
            window.open(`/users/${username}`, "_self");
        }).catch(function (error) {
            console.log(error);
        });
    }
    setUsername(input) {
        this.Username = input;
    }
    setPassword(input) {
        this.Password = input;
    }
    setEmail(input) {
        this.Email = input;
    }
    setBirthdate(input) {
        this.Birthdate = input;
    }
    handleDeleteUser(e) {
        e.preventDefault();

        const token = localStorage.getItem("token");
        const username = localStorage.getItem("user");

        axios.delete(`https://my-flixapp.herokuapp.com/users/${username}`, {
            headers: { Authorization: `Bearer ${token}` },
        }).then(() => {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            alert("Your account has been deleted.");
            window.open(`/`, "_self");
        }).catch((e) => {
            console.log(e);
        });
    }

    render() {
        const { favoriteMovies, validated } = this.state;
        const { Username, Email } = this.setState;
        const { movies } = this.props;

        return (
            <Container>
                <Row>
                    <Col xs={12} sm={4}>
                        <Card>
                            <Card.Body>
                                <Card.Title>Profile Info</Card.Title>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                                <ListGroupItem>Username: {Username} </ListGroupItem>
                                <ListGroupItem>Email: {Email} </ListGroupItem>
                            </ListGroup>
                        </Card>
                    </Col>

                    <Col xs={12} sm={8}>
                        <Card>
                            <Card.Body>
                                <Container>
                                    <Row className="justify-content-md-center">
                                        <Col md={8}>
                                            <CardGroup>
                                                <Card>
                                                    <Card.Body>
                                                        <Card.Title> Update Info </Card.Title>

                                                        <Form noValidate validated={validated} className="update-form"
                                                            onSubmit={(e) => this.handleUpdate(
                                                                e,
                                                                this.Username,
                                                                this.Password,
                                                                this.Email,
                                                                this.Birthdate
                                                            )}>
                                                            <Form.Group controlId="formUsername">
                                                                <Form.Label>Username: </Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    onChange={(e) => this.setUsername(e.target.value)}
                                                                    placeholder="Update Username"
                                                                />
                                                            </Form.Group>

                                                            <Form.Group controlId="formPassword">
                                                                <Form.Label>Password: </Form.Label>
                                                                <Form.Control
                                                                    type="password"
                                                                    onChange={(e) => this.setPassword(e.target.value)}
                                                                    required
                                                                    minLength="8"
                                                                    placeholder="Update your password"
                                                                />
                                                            </Form.Group>

                                                            <Form.Group controlId="formEmail">
                                                                <Form.Label>Email: </Form.Label>
                                                                <Form.Control
                                                                    type="email"
                                                                    onChange={(e) => this.setEmail(e.target.value)}
                                                                    required
                                                                    placeholder="Update your email"
                                                                />
                                                            </Form.Group>
                                                            <Button variant="primary" type="submit">
                                                                Update
                                                            </Button>
                                                        </Form>
                                                    </Card.Body>
                                                </Card>
                                            </CardGroup>
                                        </Col>
                                    </Row>
                                </Container>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Card>
                    <Row>
                        <Col xs={12}>
                            <h4>Favorite Movies</h4>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Card.Body>
                                {favoriteMovies.length === 0 && (
                                    <div className="text-center">
                                        You have no favorite movies.
                                    </div>
                                )}
                                <Row className="favorites-movies ">
                                    {favoriteMovies.length > 0 &&
                                        movies.map((movie) => {
                                            if (
                                                movie._id ===
                                                favoriteMovies.find((fav) => fav === movie._id)
                                            ) {
                                                return (
                                                    <CardDeck className="movie-card-deck">
                                                        <Card
                                                            className="favorites-item card-content"
                                                            style={{ width: "16rem" }}
                                                            key={movie._id}
                                                        >
                                                            <Card.Img
                                                                style={{ width: "18rem" }}
                                                                className="movieCard"
                                                                variant="top"
                                                                src={movie.ImageURL}
                                                            />
                                                            <Card.Body>
                                                                <Card.Title className="movie-card-title">
                                                                    {movie.Title}
                                                                </Card.Title>
                                                                <Button
                                                                    size="sm"
                                                                    className="profile-button remove-favorite"
                                                                    variant="danger"
                                                                    value={movie._id}
                                                                    onClick={(e) =>
                                                                        this.removeFavMovies(e, movie)
                                                                    }
                                                                >
                                                                    Remove
                                                                </Button>
                                                            </Card.Body>
                                                        </Card>
                                                    </CardDeck>
                                                );
                                            }
                                        })}
                                </Row>
                            </Card.Body>

                            <Button variant="secondary" onClick={() => handleDeleteUser(e, user)} >
                                Delete Account
                            </Button>
                        </Col>
                    </Row>
                </Card>
            </Container>
        );
    }
}