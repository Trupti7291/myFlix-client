import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import './director-view.scss';


export class DirectorView extends React.Component {
    render() {
        const { director, movie, onBackClick } = this.props;

        return (
            <div className="director-view">
                <Card>
                    <Card.Body>

                        <Card.Title className="director-name">{director.Name}</Card.Title>
                        <Card.Text> {director.Bio}</Card.Text>
                        <Card.Text> {director.Birthdate} </Card.Text>
                        <button onClick={() => { onBackClick(null); }}> Back </button>
                    </Card.Body>
                </Card>

                {/* <Button variant="primary" onClick={() => { onBackClick(null); }}>Back</Button> */}

            </div>
        );
    }
}