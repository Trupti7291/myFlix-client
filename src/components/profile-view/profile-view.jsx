import React, { useEffect, useState } from "react";
import { Container, Card, Row, Col, Figure } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import UserInfo from "./user-info";
import FavouriteMovies from "./favourite-movies";
import UpdateUser from "./update-user";
import "./profile-view.scss";

function ProfileView({ UserInfo, FavouriteMovies, UpdateUser }) {
    const [user, setUser] = useState("");
    const getUser = () => { };
    const handleSubmit = (e) => { };
    const removeFav = (id) => { };
    const handleUpdate = (e) => { };
    useEffect(() => { }, []);

    return (
        <Container>
            <Container>
                <Row>
                    <Col sm={12} sm={4}>
                        <Card>
                            <Card.Body>
                                <UserInfo name={user.Username} email={user.Email} />
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col sm={12} sm={8}>
                        <Card>
                            <Card.Body>
                                <FavouriteMovies favoriteMovieList={FavouriteMovies} />
                            </Card.Body>
                        </Card>

                    </Col>
                </Row>
                <UpdateUser handleSubmit={handleSubmit} handleUpdate={handleUpdate} />
            </Container>
        </Container>
    );
}

export default ProfileView