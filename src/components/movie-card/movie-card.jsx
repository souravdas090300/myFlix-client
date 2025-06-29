import React from 'react';
import PropTypes from 'prop-types';
import { FaStar, FaUser, FaUsers, FaUserTie } from 'react-icons/fa';

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div 
      className="movie-card"
      onClick={() => onMovieClick(movie)}
    >
      {movie.Featured && (
        <div className="featured-badge">
          <FaStar className="featured-icon" />
          <span>Featured</span>
        </div>
      )}
      
      <img src={movie.ImagePath} alt={movie.Title} className="movie-poster" />
      
      <div className="movie-info">
        <h3>{movie.Title} ({movie.ReleaseYear})</h3>
        
        <div className="movie-meta">
          <span className="rating">
            ⭐ {movie.IMDbRating}/10
          </span>
          <span className="genre">
            {movie.Genre.Name}
          </span>
        </div>
        
        <div className="movie-credits">
          <div className="credit-item">
            <FaUserTie className="credit-icon" />
            <span>{movie.Director.Name}</span>
          </div>
          
          <div className="credit-item">
            <FaUsers className="credit-icon" />
            <span>
              {movie.Actors.slice(0, 2).join(', ')}
              {movie.Actors.length > 2 && ` +${movie.Actors.length - 2}`}
            </span>
          </div>
          
          {movie.actresses && movie.actresses.length > 0 && (
            <div className="credit-item">
              <FaUser className="credit-icon" />
              <span>
                {movie.actresses.slice(0, 2).join(', ')}
                {movie.actresses.length > 2 && ` +${movie.actresses.length - 2}`}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    ReleaseYear: PropTypes.number.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string
    }).isRequired,
    IMDbRating: PropTypes.number.isRequired,
    Featured: PropTypes.bool,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string,
      Birth: PropTypes.string
    }).isRequired,
    Actors: PropTypes.arrayOf(PropTypes.string).isRequired,
    actresses: PropTypes.arrayOf(PropTypes.string),
    Description: PropTypes.string.isRequired
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};