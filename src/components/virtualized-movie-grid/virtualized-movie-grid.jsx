import React, { useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { MovieCard } from '../movie-card/movie-card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

/**
 * VirtualizedMovieGrid component for handling large lists of movies
 * For now, this is a simple implementation that can be enhanced with actual virtualization
 */
export const VirtualizedMovieGrid = ({ 
  movies, 
  onFavorite, 
  userFavorites = [], 
  containerHeight = 600,
  itemsPerRow = 4 
}) => {
  const [currentItemsPerRow, setCurrentItemsPerRow] = useState(itemsPerRow);

  // Responsive items per row based on screen size - Force single column on mobile
  useEffect(() => {
    const updateItemsPerRow = () => {
      const width = window.innerWidth;
      if (width <= 991) {
        setCurrentItemsPerRow(1); // Single column on mobile and tablets (up to 991px)
      } else if (width <= 1200) {
        setCurrentItemsPerRow(2); // Two columns on small desktop
      } else if (width <= 1400) {
        setCurrentItemsPerRow(3); // Three columns on medium desktop
      } else {
        setCurrentItemsPerRow(itemsPerRow); // Default for large screens
      }
    };

    updateItemsPerRow();
    window.addEventListener('resize', updateItemsPerRow);

    return () => window.removeEventListener('resize', updateItemsPerRow);
  }, [itemsPerRow]);

  // For now, we'll render all movies. In a real implementation,
  // we would use libraries like react-window or react-virtualized
  const movieRows = useMemo(() => {
    const rows = [];
    for (let i = 0; i < movies.length; i += currentItemsPerRow) {
      rows.push(movies.slice(i, i + currentItemsPerRow));
    }
    return rows;
  }, [movies, currentItemsPerRow]);

  return (
    <div 
      className="virtualized-movie-grid" 
      style={{ 
        maxHeight: containerHeight, 
        overflowY: 'auto',
        padding: '0 15px'
      }}
    >
      {movieRows.map((row, rowIndex) => (
        <Row key={rowIndex} className="mb-4">
          {row.map((movie) => (
            <Col
              key={movie._id}
              xs={12}
              sm={12}
              md={currentItemsPerRow === 1 ? 12 : (currentItemsPerRow <= 2 ? 6 : 4)}
              lg={currentItemsPerRow === 1 ? 12 : (currentItemsPerRow <= 3 ? 4 : 3)}
              xl={currentItemsPerRow === 1 ? 12 : (currentItemsPerRow <= 4 ? 3 : 2)}
              className={`mb-4 d-flex ${currentItemsPerRow === 1 ? 'mobile-single-col' : ''}`}
              style={currentItemsPerRow === 1 ? { 
                flex: '0 0 100%', 
                maxWidth: '100%', 
                width: '100%' 
              } : {}}
            >
              <MovieCard
                movie={movie}
                onFavorite={onFavorite}
                isFavorite={userFavorites.includes(movie._id)}
              />
            </Col>
          ))}
        </Row>
      ))}
    </div>
  );
};

VirtualizedMovieGrid.propTypes = {
  movies: PropTypes.array.isRequired,
  onFavorite: PropTypes.func.isRequired,
  userFavorites: PropTypes.array,
  containerHeight: PropTypes.number,
  itemsPerRow: PropTypes.number
};
