import axios from "axios";
import React from "react";
import { Button, Container, Row, Col, Figure, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

import './profile-view.scss'


function FavouriteMovies({ favoriteMovieList }) {
    const removeFav = (id) => {
        let token = localStorage.getItem('token');
        let url = `https://my-flixapp.herokuapp.com/users/${localStorage.getItem('user')}/movies/${id}`;
        axios.delete(url, {
            headers: { Authorization: `Bearer ${token}` },
        })
    }
    return (
        <Container>
            <Card>
                <Card.Body>
                    <Row>
                        <Col
                            sm={12}> <h2> Favourite Movies </h2>
                        </Col>
                    </Row>
                    <Row>
                        {favoriteMovieList.map((ImagePath, Title, _id) => {
                            return (
                                <Col xs={12} md={6} lg={3} key={_id}>
                                    <Figure>
                                        <Link to={`/movies/${movie._id}`}>
                                            <Figure.Image
                                                src={ImagePath}
                                                alt={Title}
                                            />
                                            <Figure.Caption>
                                                Title
                                            </Figure.Caption>
                                        </Link>
                                    </Figure>
                                    <Button variant="secondary" onClick={() => removeFav(movies._id)}> Remove from the list </Button>
                                </Col>
                            )
                        })}
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default FavouriteMovies