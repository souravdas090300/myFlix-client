import React, { useState, useCallback } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

const SearchBar = ({ initialSearchQuery = "", onSearchChange }) => {
  const [localSearchQuery, setLocalSearchQuery] = useState(initialSearchQuery);

  // Sync with external changes to initialSearchQuery
  React.useEffect(() => {
    setLocalSearchQuery(initialSearchQuery);
  }, [initialSearchQuery]);

  const handleChange = useCallback((e) => {
    const value = e.target.value;
    setLocalSearchQuery(value);
    if (onSearchChange) {
      onSearchChange(value);
    }
  }, [onSearchChange]);

  const handleClear = useCallback(() => {
    setLocalSearchQuery("");
    if (onSearchChange) {
      onSearchChange("");
    }
  }, [onSearchChange]);

  return (
    <Row className="justify-content-center mb-4">
      <Col xs={12} md={8} lg={6}>
        <Form.Group>
          <div className="position-relative">
            <Form.Control
              type="text"
              value={localSearchQuery}
              onChange={handleChange}
              placeholder="Search movies by title, genre, or director..."
              className="search-input"
              size="lg"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
            />
            {localSearchQuery && (
              <button
                type="button"
                className="btn btn-link position-absolute top-50 end-0 translate-middle-y pe-3"
                onClick={handleClear}
                style={{ border: 'none', background: 'none', color: '#6c757d' }}
              >
                ×
              </button>
            )}
          </div>
        </Form.Group>
      </Col>
    </Row>
  );
};

SearchBar.displayName = "SearchBar";

export { SearchBar };
