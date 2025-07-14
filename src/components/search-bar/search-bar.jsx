import React, { useState, useCallback } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

const SearchBar = ({ initialSearchQuery = "", onSearchChange }) => {
  const [localSearchQuery, setLocalSearchQuery] = useState(initialSearchQuery);

  const handleChange = useCallback((e) => {
    const value = e.target.value;
    setLocalSearchQuery(value);
    onSearchChange(value);
  }, [onSearchChange]);

  return (
    <Row className="justify-content-center mb-4">
      <Col xs={12} md={8} lg={6}>
        <Form.Group>
          <Form.Control
            type="text"
            value={localSearchQuery}
            onChange={handleChange}
            placeholder="Search movies by title, genre, or director..."
            className="search-input"
            size="lg"
            autoComplete="off"
          />
        </Form.Group>
      </Col>
    </Row>
  );
};

SearchBar.displayName = "SearchBar";

export { SearchBar };
