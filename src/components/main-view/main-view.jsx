import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';

import { Container, Row, Col } from 'react-bootstrap';

export class MainView extends React.Component {

    constructor() {
        super();
        this.state = {
            movies: [],
            selectedMovie: null,
            user: null
        };
    }

    getMovies(token) {
        axios.get('https://my-flixapp.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                // Assign the result to the state
                this.setState({
                    movies: response.data
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getMovies(accessToken);
        }
    }

    /*When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` *property to that movie*/
    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }

    onRegister(register) {
        this.setState({
            register
        });
    }

    /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
            user: authData.user.Username
        });
        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
    }

    render() {
        const { movies, selectedMovie, user, register } = this.state;

        /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
        if (!register) return (<RegistrationView onRegister={(register) => this.onRegister(register)} />);
        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />

        if (movies.length === 0) return <div className="main-view" />;

        return (
            <Container>
                <Router>
                    <Row className="main-view justify-content-md-center">
                        <Route exact path="/" render={() => {
                            return movies.map(m => (
                                <Col md={3} key={m._id}>
                                    <MovieCard movie={m} />
                                </Col>
                            ))
                        }} />
                        <Route path="/movies/:movieId" render={({ match }) => {
                            return <Col md={8}>
                                <MovieCard movie={movies.find(m => m._id === match.params.movieId)} />
                            </Col>
                        }} />
                    </Row>
                </Router>
            </Container >
        );
    }
}

