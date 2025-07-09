import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, ListGroup, Badge, Button } from 'react-bootstrap';

export const MovieView = ({ movie, onFavorite, isFavorite }) => {
  // Safely access nested properties
  const directorName = movie.Director?.Name || 'Unknown director';
  const directorBirth = movie.Director?.Birth || 'Unknown birth date';
  const directorBio = movie.Director?.Bio || 'No biography available';
  const genreName = movie.Genre?.Name || 'Unknown genre';
  const genreDescription = movie.Genre?.Description || 'No description available';

  return (
    <Container className="movie-view mt-4">
      <Row>
        <Col md={5} lg={4} className="mb-4">
          <Card className="h-100">
            <Card.Img
              variant="top"
              src={movie.ImagePath}
              alt={movie.Title}
              className="movie-poster-large"
            />
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <Badge bg="warning" text="dark">
                  IMDb: {movie.IMDbRating}/10
                </Badge>
                <Badge bg="secondary">
                  {movie.ReleaseYear}
                </Badge>
                {movie.Featured && (
                  <Badge bg="danger">Featured</Badge>
                )}
              </div>
              {onFavorite && (
                <Button
                  variant={isFavorite ? "warning" : "outline-warning"}
                  className="w-100 mt-2 d-flex align-items-center justify-content-center"
                  onClick={() => onFavorite(movie._id)}
                >
                  <i className={`bi me-2 ${isFavorite ? "bi-heart-fill" : "bi-heart"}`}></i>
                  {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                </Button>
              )}
            </Card.Body>
          </Card>
        </Col>
       
        <Col md={7} lg={8}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title as="h1" className="mb-4">{movie.Title}</Card.Title>
             
              <div className="mb-4">
                <h3>Description</h3>
                <Card.Text>{movie.Description}</Card.Text>
              </div>
             
              <div className="mb-4">
                <h3>Genre</h3>
                <Card.Text>
                  <strong>{genreName}</strong> - {genreDescription}
                </Card.Text>
              </div>
             
              <div className="mb-4">
                <h3>Director</h3>
                <Card.Text>
                  <strong>{directorName}</strong><br />
                  Born: {directorBirth}<br />
                  {directorBio}
                </Card.Text>
              </div>
             
              <div className="mb-4">
                <h3>Cast</h3>
                <ListGroup horizontal className="flex-wrap">
                  {movie.Actors?.map((actor, index) => (
                    <ListGroup.Item key={index} className="m-1">
                      {actor}
                    </ListGroup.Item>
                  ))}
                  {movie.actresses?.map((actress, idx) => (
                    <ListGroup.Item key={`a-${idx}`} className="m-1">
                      {actress}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </div>
             
              <div className="d-flex justify-content-between mt-3">
                <Link to="/" className="btn btn-primary">
                  Back to Movies
                </Link>
                {onFavorite && (
                  <Button
                    variant={isFavorite ? "warning" : "outline-warning"}
                    onClick={() => onFavorite(movie._id)}
                  >
                    <i className={`bi me-2 ${isFavorite ? "bi-heart-fill" : "bi-heart"}`}></i>
                    {isFavorite ? "Remove Favorite" : "Add Favorite"}
                  </Button>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    ReleaseYear: PropTypes.number.isRequired,
    IMDbRating: PropTypes.number.isRequired,
    Featured: PropTypes.bool,
    Genre: PropTypes.shape({
      Name: PropTypes.string,
      Description: PropTypes.string
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string,
      Bio: PropTypes.string,
      Birth: PropTypes.string,
      Death: PropTypes.string
    }),
    Actors: PropTypes.arrayOf(PropTypes.string),
    actresses: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  onFavorite: PropTypes.func,
  isFavorite: PropTypes.bool
};