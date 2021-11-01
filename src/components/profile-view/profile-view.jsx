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
    const getUser = (token) => {
        axios.get('https://my-flixapp.herokuapp.com/users', {
            headers: { Authorization: `Bearer ${token}` }
        }).then(response => {
            this.setState({
                users: response.data
            });
        }).catch(function (error) {
            console.log(error);
        });
    };
    const handleSubmit = (e) => { };
    const removeFav = (id) => {
        axios.delete(`https://my-flixapp.herokuapp.com/users/${username}/FavoriteMovies/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
            .then(() => {
                this.componentDidMount();
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const handleUpdate = (e) => {
        const { username, password, email, birthday } = this.state;
        axios.put(
            `https://my-flixapp.herokuapp.com/users/${localStorage.getItem("username")}`,
            {
                Username: username,
                Password: password,
                Email: email,
                Birthday: birthday,
            },
            {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}`, },
            }
        )
            .then(() => {
                const { reloadScreen } = this.props;
                localStorage.setItem("username", username);
                reloadScreen();
            })
            .catch((error) => {
                console.log(error);
            });
    };
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