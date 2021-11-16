import React from 'react';
<<<<<<< HEAD
import propTypes, { func } from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

=======
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from "react-router-dom";

import "./movie-card.scss";
>>>>>>> myFlix-client

export class MovieCard extends React.Component {
    render() {
        const { movie } = this.props;

        return (
            <Card>
                <Card.Img variant="top" src={movie.ImagePath} />
                <Card.Body>
                    <Card.Title>{movie.Title}</Card.Title>
                    {/* <Card.Text>{movie.Description}</Card.Text> */}
                    <Link to={`/movies/${movie._id}`}>
                        <Button variant="link"> See more </Button>
                    </Link>
                </Card.Body>
            </Card>
        );
    }
}