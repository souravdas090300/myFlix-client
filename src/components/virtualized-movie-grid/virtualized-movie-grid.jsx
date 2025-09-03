import React, { useMemo, useState, useEffect, useRef, useCallback } from 'react';
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
  const containerRef = useRef(null);
  const [scrollTop, setScrollTop] = useState(0);

  // Responsive items per row based on screen size
  useEffect(() => {
    const updateItemsPerRow = () => {
      const width = window.innerWidth;
      if (width <= 576) {
        setCurrentItemsPerRow(1); // Single column on mobile
      } else if (width <= 768) {
        setCurrentItemsPerRow(2); // Two columns on tablet
      } else if (width <= 992) {
        setCurrentItemsPerRow(3); // Three columns on small desktop
      } else {
        setCurrentItemsPerRow(itemsPerRow); // Default for large screens
      }
    };

    updateItemsPerRow();
    window.addEventListener('resize', updateItemsPerRow);

    return () => window.removeEventListener('resize', updateItemsPerRow);
  }, [itemsPerRow]);

  // For now, we'll render all movies. In a real implementation,
  // we will implement a lightweight windowing approach to avoid rendering
  // the entire list at once. This reduces DOM nodes and expensive image
  // observers/loads for off-screen items.
  const movieRows = useMemo(() => {
    const rows = [];
    for (let i = 0; i < movies.length; i += currentItemsPerRow) {
      rows.push(movies.slice(i, i + currentItemsPerRow));
    }
    return rows;
  }, [movies, currentItemsPerRow]);

  // Basic windowing calculations
  const ROW_ESTIMATED_HEIGHT = 440; // estimated height per row (px)
  const totalRows = movieRows.length;

  const onScroll = useCallback(() => {
    if (!containerRef.current) return;
    // use rAF to avoid layout thrash
    const top = containerRef.current.scrollTop;
    setScrollTop(top);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [onScroll]);

  const firstVisibleRow = Math.max(0, Math.floor(scrollTop / ROW_ESTIMATED_HEIGHT) - 1);
  const visibleRowCount = Math.ceil(containerHeight / ROW_ESTIMATED_HEIGHT) + 2; // buffer
  const lastVisibleRow = Math.min(totalRows - 1, firstVisibleRow + visibleRowCount - 1);

  const topSpacerHeight = firstVisibleRow * ROW_ESTIMATED_HEIGHT;
  const bottomSpacerHeight = Math.max(0, (totalRows - lastVisibleRow - 1) * ROW_ESTIMATED_HEIGHT);

  return (
    <div
      ref={containerRef}
      className="virtualized-movie-grid"
      style={{
        maxHeight: containerHeight,
        overflowY: 'auto',
        padding: '0 15px'
      }}
    >
      {/* Top spacer to maintain scroll height */}
      <div style={{ height: topSpacerHeight }} />

      {movieRows.slice(firstVisibleRow, lastVisibleRow + 1).map((row, rowIndex) => (
        <Row key={firstVisibleRow + rowIndex} className="mb-4">
          {row.map((movie) => (
            <Col
              key={movie._id}
              xs={12}
              sm={currentItemsPerRow === 1 ? 12 : 6}
              md={currentItemsPerRow <= 2 ? 6 : 4}
              lg={currentItemsPerRow <= 3 ? 4 : 3}
              xl={currentItemsPerRow <= 4 ? 3 : 2}
              className="mb-4 d-flex"
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

      {/* Bottom spacer */}
      <div style={{ height: bottomSpacerHeight }} />
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
