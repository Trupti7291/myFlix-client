import React from "react";
import { Button, Card } from "react-bootstrap";

export class Genreview extends React.Component {
    render() {
        const { genre, movie, onBackClick } = this.props;

        return (
            <div className="director-view">
                <Card>
                    <Card.Body>

                        <Card.Title className="genre-name">{genre.Name}</Card.Title>
                        <Card.Text> {genre.Description} </Card.Text>
                        <button onClick={() => { onBackClick(null); }}> Back </button>
                    </Card.Body>
                </Card>

                {/* <Button variant="primary" onClick={() => { onBackClick(null); }}>Back</Button> */}

            </div>
        );
    }
}