import axios from "axios";
import React from "react";
import { Button, Container, Row, Col, Figure, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

function FavoriteMovies({ favoriteMovieList }) {
    const removeFav = (id) => {
        let token = localStorage.getItem('token');
        let url = `https://my-flixapp.herokuapp.com/users/${localStorage.getItem('user')}/movies/${id}`;
        axios.delete(url, {
            headers: { Authorization: `Bearer ${token}` },
        })
    }

    return (
        <Container>
            <Row>
                <Col
                    sm={12}> <h2> Favorite Movies </h2>
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
        </Container>
    );
}

export default FavoriteMovies