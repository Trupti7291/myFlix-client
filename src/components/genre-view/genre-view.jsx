import React from "react";
import { Button } from "react-bootstrap";

export class Genreview extends React.Component {
    render() {
        const { movie, onBackClick } = this.props;

        return (
            <div className="genre-view">

                <div className="genre-name">
                    <span className="value">{movie.Genre.Name}</span>
                </div>

                <div className="director-discription">
                    <span className="value">{movie.Genre.Description}</span>
                </div>

                {/* <Button variant="primary" onClick={() => { onBackClick(null); }}>Back</Button> */}
                <Link to={`/`}>
                    <Button className='returnButton' variant='dark'>Return to Movie List</Button>
                </Link>

            </div>
        );
    }
}