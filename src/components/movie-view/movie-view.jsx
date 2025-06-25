// src/components/movie-view/movie-view.jsx
import React from 'react';
import PropTypes from 'prop-types';

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div className="movie-view">
      <div className="movie-poster-container">
        <img src={movie.ImagePath} alt={movie.Title} className="movie-poster-large" />
        <div className="movie-meta">
          <span className="rating">{movie.IMDbRating}/10</span>
          <span className="year">{movie.ReleaseYear}</span>
          {movie.Featured && <span className="featured">Featured</span>}
        </div>
      </div>
      
      <div className="movie-details">
        <h1>{movie.Title}</h1>
        
        <div className="detail-section">
          <h3>Description</h3>
          <p>{movie.Description}</p>
        </div>
        
        <div className="detail-section">
          <h3>Genre</h3>
          <p>{movie.Genre.Name} - {movie.Genre.Description}</p>
        </div>
        
        <div className="detail-section">
          <h3>Director</h3>
          <p><strong>{movie.Director.Name}</strong></p>
          <p>Born: {movie.Director.Birth}</p>
          <p>{movie.Director.Bio}</p>
        </div>
        
        <div className="detail-section">
          <h3>Cast</h3>
          <ul className="cast-list">
            {movie.Actors.map((actor, index) => (
              <li key={index}>{actor}</li>
            ))}
          </ul>
        </div>
        
        <button onClick={onBackClick} className="back-button">
          Back to Movies
        </button>
      </div>
    </div>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    ReleaseYear: PropTypes.number.isRequired,
    IMDbRating: PropTypes.number.isRequired,
    Featured: PropTypes.bool,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }).isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired
    }).isRequired,
    Actors: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};