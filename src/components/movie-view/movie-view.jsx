import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

export class MovieView extends React.Component {
    addFavoriteMovie(event, movie) {
        const token = localStorage.getItem("token");
        const username = localStorage.getItem("user");
        console.log("username", username);

        axios
            .post(
                `https://my-flixapp.herokuapp.com/users/${username}/movies/${movie._id}`,
                {},
                {
                    headers: { Authorization: `Bearer ${token}` },
                    "Content-Type": "application/json",
                }
            )
            .then((response) => {
                console.log("response", response);
                alert(`Added to Favorites`);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    render() {
        const { movie, onBackClick } = this.props;
        console.log("movie", movie);
        return (
            <div className="movie-view">
                <Card>
                    <Card.Body>
                        <Card.Img src={movie.ImagePath} crossOrigin="anonymous" />
                        <Card.Title className="movie-title"> {movie.Title} </Card.Title>
                        <Card.Text> {movie.Description} </Card.Text>
                        <div>
                            <Link to={`/directors/${movie.Director.Name}`}>
                                <Button variant="link">Director</Button>
                            </Link>

                            <Link to={`/genres/${movie.Genre.Name}`}>
                                <Button variant="link">Genre</Button>
                            </Link>
                            <Button
                                value={movie._id}
                                onClick={(e) => this.addFavoriteMovie(e, movie)}
                            >
                                {" "}
                                Add to Favorites{" "}
                            </Button>
                            {/* <button onClick={() => { onBackClick(null); }}>Back</button> */}
                            <Button onClick={onBackClick} variant="secondary">
                                {" "}
                                Back{" "}
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}