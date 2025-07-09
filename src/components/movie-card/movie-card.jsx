import React from "react";
import PropTypes from "prop-types";
import { Card, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie, onFavorite, isFavorite }) => (
  <Card className="movie-card h-100 shadow-sm">
    {/* Featured badge (if needed) */}
    {movie.Featured && (
      <Badge bg="danger" className="position-absolute top-0 end-0 m-2">
        Featured
      </Badge>
    )}
    
    <Card.Img 
      variant="top" 
      src={movie.ImagePath} 
      alt={movie.Title} 
      className="movie-poster object-fit-cover"
      style={{ height: "380px" }}
    />
    
    <Card.Body className="d-flex flex-column">
      <Card.Title as="h5" className="mb-2">{movie.Title}</Card.Title>
      
      {/* Movie meta info */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <span className="text-warning">
          <i className="bi bi-star-fill me-1"></i>
          {movie.Rating}
        </span>
        <Badge bg="primary">{movie.Genre.Name}</Badge>
      </div>
      
      {/* Buttons */}
      <div className="d-flex justify-content-between mt-auto">
        <Link to={`/movies/${movie._id}`} className="text-decoration-none">
          <Button variant="primary" size="sm" className="d-flex align-items-center">
            <i className="bi bi-info-circle me-1"></i>
            Details
          </Button>
        </Link>
        
        {onFavorite && (
          <Button
            variant={isFavorite ? "warning" : "outline-warning"}
            size="sm"
            className="d-flex align-items-center"
            onClick={(e) => {
              e.preventDefault();
              onFavorite(movie._id);
            }}
          >
            <i className={`bi me-1 ${isFavorite ? "bi-heart-fill" : "bi-heart"}`}></i>
            {isFavorite ? "Unfavorite" : "Favorite"}
          </Button>
        )}
      </div>
    </Card.Body>
  </Card>
);

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Featured: PropTypes.bool,
    Rating: PropTypes.number,
    Genre: PropTypes.shape({
      Name: PropTypes.string
    })
  }).isRequired,
  onFavorite: PropTypes.func,
  isFavorite: PropTypes.bool
};