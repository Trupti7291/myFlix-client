import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export class MovieView extends React.Component {

    keypressCallback(event) {
        console.log(event.key);
    }

    componentDidMount() {
        document.addEventListener('keypress', this.keypressCallback);
    }

    addFavoriteMovie(_id) {
        const token = localStorage.getItem("token");
        const username = localStorage.getItem("username");

        axios.post(`https://my-flixapp.herokuapp.com/users/${username}/movies/${this.props.movie._id}`, {}, {
            headers: { Authorization: `Bearer ${token}` },
            method: "POST",
        }).then((response) => {
            alert(`Added to Favorites`);
        }).catch(function (error) {
            console.log(error);
        });
    }


    componentWillUnmount() {
        document.removeEventListener('keypress', this.keypressCallback);
    }

    render() {
        const { movie, onBackClick } = this.props;

        return (
            <div className="movie-view">
                <div className="movie-poster">
                    <img src={movie.ImagePath} crossOrigin="anonymous" />
                </div>
                <div className="movie-title">
                    <span className="label">Title: </span>
                    <span className="value">{movie.Title} </span>
                </div>
                <div className="movie-description">
                    <span className="label">Description: </span>
                    <span className="value">{movie.Description} </span>
                </div>
                <div className="movie-genre">
                    <Link to={`/genres/${movie.Genre.Name}`}>
                        <Button varient="link"> Genre </Button>
                    </Link>
                    <span className="value"> {movie.Genre.Name} </span>
                </div>
                <div className="movie-director">
                    <Link to={`/directors/${movie.Director.Name}`}>
                        <Button varient="link"> Director </Button>
                    </Link>
                    <span className="value"> {movie.Director.Name} </span>
                </div>
                <Button value={movie._id} onClick={(e) => this.addFavoriteMovie(e, movie)}> Add to Favorites </Button>
                <button onClick={() => { onBackClick(null); }}>Back</button>
            </div>

        );
    }
}