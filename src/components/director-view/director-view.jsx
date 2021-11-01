import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import './director-view.scss';


export class DirectorView extends React.Component {
    render() {
        const { movie, onBackClick } = this.props;

        return (
            <div className="director-view">

                <div className="director-name">
                    <span className="value">{movie.Director.Name}</span>
                </div>

                <div className="director-bio">
                    <span className="value">{movie.Director.Bio}</span>
                </div>

                <div className="director-birthdate">
                    <span className="value">{movie.Director.Birthdate}</span>
                </div>
                <button onClick={() => { onBackClick(null); }}> Back </button>

                {/* <Button variant="primary" onClick={() => { onBackClick(null); }}>Back</Button> */}

            </div>
        );
    }
}