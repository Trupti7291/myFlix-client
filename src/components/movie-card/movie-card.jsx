import React from 'react';
import propTypes, { func } from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


export class MovieCard extends React.Component {
    render() {
        const { movie, onMovieClick } = this.props;
        return <div className="movie-card" onClick={() => { onMovieClick(movie); }}>{movie.Title} </div>;
    }
}

MovieCard.propTypes = {
    movie: propTypes.shape({
        Title: propTypes.string.isRequired,
        Description: propTypes.string.isRequired,
        ImagePath: propTypes.string.isRequired
    }).isRequired,
    onMovieClick: propTypes.func.isRequired
};