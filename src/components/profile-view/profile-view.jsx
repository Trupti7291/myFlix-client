import React, { useState } from 'react';
import axios from 'axios';
import { Button, Card, Col, Form, Row, Container } from 'react-bootstrap';
import './profile-view.scss';


export class ProfileView extends React.Component {
    constructor(props) {
        super(props);


    }

    removeFavouriteMovie(_id) {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');

        console.log(_id, '_id')
        axios.delete(`https://my-flixapp.herokuapp.com/users/${user}/favorites/${_id}`, {

            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => {
                alert('Favorite was removed')
                window.location.reload();



            })
            .catch(function (error) {
                console.log(error);
            })
    }
    deleteUser() {

        const answer = window.confirm("Are you sure you want to delete your account?");
        if (answer) {
            const token = localStorage.getItem("token");
            const user = localStorage.getItem("user");
            axios.delete(`https://my-flixapp.herokuapp.com/users/${user}`,
                { headers: { Authorization: `Bearer ${token}` } }
            )
                .then(() => {
                    alert(user + " has been deleted.");
                    localStorage.removeItem("user");
                    localStorage.removeItem("token");
                    window.location.pathname = "/";
                })
                .catch(function (error) {
                    console.log(error);
                })
        };

    }

    render() {
        const { movies, user, username, email, password, birthday, favoriteMovies } = this.props;

        return (
            <Container className="ProfileView">
                <Row className="justify-content-md-center">
                    <Col>
                        <p>Username: {username}</p>
                        <p>Password: *******</p>
                        <p>Email: {email}</p>
                        <p>Birthday: {birthday}</p>
                    </Col>
                </Row>
                <Row>
                    <Card.Body>
                        {favoriteMovies.length === 0 && <div className="text-center">Empty.</div>}
                        <Row className="favorites-movies ">
                            {favoriteMovies.length > 0 &&
                                movies.map((movie) => {
                                    if (movie._id === favoriteMovies.find((fav) => fav === movie._id)) {
                                        return (
                                            <Col lg={4} key={movie._id}>
                                                <Card className="favorites-item card-content" >
                                                    <Card.Img className="movieCard" variant="top" src={movie.ImagePath} crossOrigin="anonymous" />
                                                    <Card.Body>
                                                        <Card.Title className="movie-card-title">{movie.title}</Card.Title>
                                                        <Button size='sm' className='profile-button remove-favorite' variant='danger' value={movies.title} onClick={() => this.removeFavouriteMovie(movie._id)}>
                                                            Remove
                                                        </Button>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        )
                                    }
                                })
                            }
                        </Row>
                    </Card.Body>
                </Row>
                <Row>
                    <Col className="acc-btns mt-1">
                        <Button size="md" variant="outline-danger" type="submit" ml="4" onClick={() => this.deleteUser()} >Delete Account</Button>
                    </Col>

                </Row>
            </Container>
        )
    }
}