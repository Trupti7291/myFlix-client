import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { Genreview } from '../genre-view/genre-view';
import { RegistrationView } from '../registration-view/registration-view';
import { ProfileView } from '../profile-view/profile-view';

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

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getMovies(accessToken);
        }
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

    getMovies(token) {
        axios.get('https://my-flixapp.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}` }
        })
            // axios.get(`${config.API_ADDRESS}/movies`, {
            //     headers: { Authorization: `Bearer ${token}` },
            // })
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

    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            user: null
        });
    }

    render() {
        const { movies, user } = this.state;

        return (
            <Container>
                <Router>
                    <div className="main-view">
                        <Row className="main-view justify-content-md-center">
                            <Route exact path="/" render={() => {
                                if (!user) return <Col>
                                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                                </Col>

                                //Before the movies have been loaded
                                if (movies.length === 0) return <div className="main-view" />
                                return movies.map(m => (
                                    <Col md={3} key={m._id}>
                                        <MovieCard movie={m} />
                                    </Col>
                                ))
                            }} />
                            <Route path="/register" render={() => {
                                if (user) return <Redirect to="/" />
                                return <Col>
                                    <RegistrationView />
                                </Col>
                            }} />
                            <Route path="/movies/:movieId" render={({ match, history }) => {
                                return <Col md={8}>
                                    <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
                                </Col>
                            }} />
                            <Route path="/directors/:name" render={({ match, history }) => {
                                if (movies.length === 0) return <div className="main-view" />;
                                return <Col md={8}>
                                    <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
                                </Col>
                            }
                            } />
                            <Route exact path="/genres/:name" render={({ match, history }) => {
                                return <Col md={8}>
                                    <Genreview genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
                                </Col>
                            }} />
                            <Route exact path='/users/:username' render={({ history }) => {
                                if (!user) return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;
                                if (movies.length === 0) return <div className="main-view" />;
                                return <ProfileView history={history} movies={movies} />
                            }} />
                        </Row>
                    </div>
                </Router>
            </Container >
        );
    }
}

