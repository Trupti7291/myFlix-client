import React, { useEffect, useState } from "react";
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";

import { Link } from "react-router-dom";

import axios from "axios";
import UserInfo from "./user-info";
import FavoriteMovies from "./favorite-movie";
import UpdateUser from "./update-user";

export function ProfileView({ movies, onUpdatedUserInfo }) {
    const [user, setUser] = useState({
        Username: " ",
        Email: " ",
        FavoriteMovies: []
    })
    const favoriteMovieList = movies.filter((movies) => {
        return user.FavoriteMovies.includes(movies._id);
    });
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
    }
    const handleSubmit = (e) => { }
    const removeFav = (id) => {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");

        axios.delete(`https://my-flixapp.herokuapp.com/users/${username}/movies/${movie._id}`, {
            headers: { Authorization: `Bearer ${token}` },
        }).then(() => {
            alert("Movie was removed");
            window.location.reload();
        }).catch(function (error) {
            console.log(error);
        });
    }
    const handleUpdate = (e) => {
        e.preventDefault()
        let token = localStorage.getItem("token");
        let user = localStorage.getItem("user");
        console.log(username, password, email, 'username', 'password', 'email')
        const validated = formValidation();
        {/*if (validated) { */ }
        axios.put(`https://my-flixapp.herokuapp.com/users/${user}`,
            {
                Username: username,
                Password: password,
                Email: email,
                Birthday: birthday
            },
            {
                headers: { Authorization: `Bearer ${token}` }
            }).then((response) => {
                const data = response.data;
                console.log(data);
                alert(user + " has been updated.");
                localStorage.setItem("user", username)
                console.log(response);
                window.open('/', '_self');
            }).catch(e => {
                alert('user was not updated ')
                console.log(error.response.data);
            });
    };
    const formValidation = () => {

        const usernameError = {};
        const emailError = {};
        const passwordError = {};
        let isValid = true;

        if (username.length < 5) {
            usernameError.usernameShort = "Username must have at least  5 characters."
            isValid = false;
        }

        if (password.length < 5) {
            passwordError.passwordMissing = "Your password must contain  at least 6 characters."
            isValid = false;
        }

        if (!email.includes(".") || !email.includes("@")) {
            emailError.emailNotEmail = "Enter a valid email"
            isValid = false;
        }

        setUsernameError(usernameError);
        setPasswordError(passwordError);
        setEmailError(emailError);
        return isValid;
    }
    const handleDeleteUser = (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");

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

    useEffect(() => {
        let isMounted = true;
        isMounted && getUser();
        return () => {
            isMounted = false;
        }
    }, []);

    return (
        <Container>
            <Row>
                <Col xs={12} sm={4}>
                    <Card>
                        <Card.Body>
                            <UserInfo name={user.Username} email={user.Email} />
                        </Card.Body>
                    </Card>

                </Col>
                <Col xs={12} sm={4}>
                    <Card>
                        <Card.Body>
                            <UpdateUser user={user} setUser={setUser} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <FavoriteMovies favoriteMovieList={favoriteMovieList} />
            <Button size="md" variant="outline-danger" type="submit" ml="4" onClick={() => this.deleteUser()} >Delete Account</Button>
        </Container>
    );

}
