import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import { setMovies, setFilter } from '../../actions/actions';
import MoviesList from "../movies-list/movies-list";

import { LoginView } from '../login-view/login-view';
// import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { Genreview } from '../genre-view/genre-view';
import { RegistrationView } from '../registration-view/registration-view';
import { ProfileView } from '../profile-view/profile-view';
import { NavigationBar } from '../navigation-bar/navigation-bar';

import { Container, Row, Col } from 'react-bootstrap';
import "./main-view.scss";

class MainView extends React.Component {

    constructor() {
        super();
        this.state = {
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
        }).then(response => {
            // Assign the result to the state
            this.props.setMovies(response.data);
        })
            .catch(function (error) {
                console.log(error);
            });
    }

    getUsers(token) {
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

    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            user: null
        });
    }

    render() {
        const { movies } = this.props;
        const { user } = this.state;

        return (
            <Container>
                <Router>
                    <NavigationBar user={user} />
                    <div className="main-view">
                        <Row className="main-view justify-content-md-center">
                            <Route exact path="/" render={() => {
                                if (!user) return <Col>
                                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                                </Col>

                                //Before the movies have been loaded
                                if (movies.length === 0) return <div className="main-view" />
                                // return movies.map(m => (
                                //     <Col md={3} key={m._id}>
                                //         <MovieCard movie={m} />
                                //     </Col>
                                // ))
                                return <MoviesList movies={movies} />
                            }} />
                            <Route path="/register" render={() => {
                                if (user) return <Redirect to="/" />
                                return <Col>
                                    <RegistrationView />
                                </Col>
                            }} />
                            <Route path="/movies/:movieId" render={({ match, history }) => {
                                if (movies.length === 0) return <div className="main-view" />;
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

let mapStateToProps = state => {
    return { movies: state.movies }
}

export default connect(mapStateToProps, { setMovies, setFilter })(MainView);
