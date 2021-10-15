import React from 'react';
import axios from 'axios';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
        axios.get('https://my-flixapp.herokuapp.com/movies')
            .then(response => {
                this.setState({
                    movies: response.data
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    /*When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` *property to that movie*/
    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }

    /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
    onLoggedIn(user) {
        this.setState({
            user
        });
    }

    render() {
        const { movies, selectedMovie } = this.state;

        /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />

        if (selectedMovie)
            return <MovieView movie={selectedMovie} />;

        if (movies.length === 0) return <div className="main-view" />;

        return (
            <Container>
                <div className="main-view">
                    <Row className="justify-content-md-center">
                        {/*If the state of `selectedMovie` is not null, that selected movie will be returned otherwise, all *movies will be returned*/}
                        {selectedMovie
                            ? (

                                <Col md={8}>
                                    <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => {
                                        this.setSelectedMovie(newSelectedMovie);
                                    }} />
                                </Col>

                            )
                            : movies.map(movie => (
                                <Col md={3}>
                                    <MovieCard key={movie._id} movie={movie} onMovieClick={newSelectedMovie => {
                                        this.setSelectedMovie(newSelectedMovie);
                                    }} />
                                </Col>
                            ))
                        }
                    </Row>
                </div>
            </Container >
        );
    }
}

