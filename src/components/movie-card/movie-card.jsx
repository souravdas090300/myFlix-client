import React from "react";
import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie, onFavorite, isFavorite }) => (
  <Card className="movie-card h-100">
    <Card.Img variant="top" src={movie.ImagePath} alt={movie.Title} className="movie-poster" />
    <Card.Body className="movie-info d-flex flex-column">
      <Card.Title as="h3">{movie.Title}</Card.Title>
      <div className="d-flex justify-content-between mt-3">
        <Link to={`/movies/${movie._id}`}>
          <Button variant="primary" size="sm">Open</Button>
        </Link>
        {onFavorite && (
          <Button
            variant={isFavorite ? "warning" : "outline-warning"}
            size="sm"
            onClick={e => {
              e.preventDefault();
              onFavorite(movie._id);
            }}
          >
            {isFavorite ? "Unfavorite" : "Favorite"}
          </Button>
        )}
      </div>
    </Card.Body>
  </Card>
);

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired,
  onFavorite: PropTypes.func,
  isFavorite: PropTypes.bool
};