import React, { useState, useEffect, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const SearchBar = ({ initialSearchQuery = '', onSearchChange }) => {
  const [query, setQuery] = useState(initialSearchQuery);
  const inputRef = useRef(null);
  const timeoutRef = useRef(null);

  // Sync with parent when initialSearchQuery changes
  useEffect(() => {
    setQuery(initialSearchQuery);
    if (inputRef.current) {
      inputRef.current.value = initialSearchQuery;
    }
  }, [initialSearchQuery]);

  // Use direct DOM manipulation for immediate response
  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Debounce the parent notification
    timeoutRef.current = setTimeout(() => {
      onSearchChange(value);
    }, 100); // Very short delay
  };

  const handleClear = () => {
    setQuery('');
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    onSearchChange('');
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <Row className="justify-content-center mb-4">
      <Col xs={12} md={8} lg={6}>
        <div className="position-relative">
          <Form.Control
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Search movies by title, genre, or director..."
            className="search-input"
            autoComplete="off"
          />
          {query && (
            <Button
              variant="link"
              className="position-absolute end-0 top-50 translate-middle-y pe-3"
              onClick={handleClear}
              style={{
                border: 'none',
                background: 'none',
                color: '#6c757d',
                padding: 0,
                transform: 'translateY(-50%)'
              }}
            >
              ×
            </Button>
          )}
        </div>
      </Col>
    </Row>
  );
};

SearchBar.displayName = 'SearchBar';

export { SearchBar };