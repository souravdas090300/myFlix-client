import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, ListGroup, Badge } from 'react-bootstrap';

export const MovieView = ({ movie }) => {
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
                  <strong>{movie.Genre.Name}</strong> - {movie.Genre.Description}
                </Card.Text>
              </div>
              
              <div className="mb-4">
                <h3>Director</h3>
                <Card.Text>
                  <strong>{movie.Director.Name}</strong><br />
                  Born: {movie.Director.Birth}<br />
                  {movie.Director.Bio}
                </Card.Text>
              </div>
              
              <div className="mb-4">
                <h3>Cast</h3>
                <ListGroup horizontal className="flex-wrap">
                  {movie.Actors.map((actor, index) => (
                    <ListGroup.Item key={index} className="m-1">
                      {actor}
                    </ListGroup.Item>
                  ))}
                  {movie.actresses && movie.actresses.map((actress, idx) => (
                    <ListGroup.Item key={`a-${idx}`} className="m-1">
                      {actress}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </div>
              
              <Link to="/" className="btn btn-primary mt-3">
                Back to Movies
              </Link>
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
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }).isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
      Death: PropTypes.string
    }).isRequired,
    Actors: PropTypes.arrayOf(PropTypes.string).isRequired,
    actresses: PropTypes.arrayOf(PropTypes.string)
  }).isRequired
};
