import React from 'react';
import propTypes, { func } from 'prop-types';

export class MovieCard extends React.Component {
    render() {
        const { movie, onMovieClick } = this.props;
        return <div className="movie-card" onClick={() => { onMovieClick(movie); }}>{movie.Title} </div>;
    }
}

MovieCard.propTypes = {
    movie: propTypes.shape({
        Title: propTypes.string
    }).isRequired,
    onMovieClick: propTypes.func.isRequired
};