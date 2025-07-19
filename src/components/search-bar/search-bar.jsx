import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const SearchBar = React.memo(({ initialSearchQuery = '', onSearchChange }) => {
  const [query, setQuery] = useState(initialSearchQuery);

  // Sync with parent when initialSearchQuery changes
  useEffect(() => {
    setQuery(initialSearchQuery);
  }, [initialSearchQuery]);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearchChange(value);
  };

  const handleClear = () => {
    setQuery('');
    onSearchChange('');
  };

  return (
    <Row className="justify-content-center mb-4">
      <Col xs={12} md={8} lg={6}>
        <div className="position-relative">
          <Form.Control
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Search movies by title, genre, or director..."
            className="search-input"
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
});

SearchBar.displayName = 'SearchBar';

export { SearchBar };