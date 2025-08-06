import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { IoClose, IoSearch } from 'react-icons/io5';

const SearchBar = React.memo(({ 
  initialSearchQuery = '', 
  onSearchChange,
  debounceTime = 100, // Reduced from 200ms to 100ms
  placeholder = "Search..."
}) => {
  const [query, setQuery] = useState(initialSearchQuery);
  const [isSearching, setIsSearching] = useState(false);
  const timeoutRef = useRef(null);
  const mountedRef = useRef(true);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      mountedRef.current = false;
      clearTimeout(timeoutRef.current);
    };
  }, []);

  // Sync with parent when initialSearchQuery changes
  useEffect(() => {
    if (mountedRef.current) {
      setQuery(initialSearchQuery);
    }
  }, [initialSearchQuery]);

  // Optimized debounce with cancellation
  const debouncedSearch = useCallback((value) => {
    clearTimeout(timeoutRef.current);
    
    // Remove the undefined deferredSearchQuery reference
    timeoutRef.current = setTimeout(() => {
      if (mountedRef.current) {
        setIsSearching(true);
        Promise.resolve(onSearchChange(value))
          .finally(() => {
            if (mountedRef.current) setIsSearching(false);
          });
      }
    }, debounceTime);
  }, [onSearchChange, debounceTime]);

  // Handle input changes with immediate feedback
  const handleChange = useCallback((e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  }, [debouncedSearch]);

  const handleClear = useCallback(() => {
    setQuery('');
    debouncedSearch('');
    document.getElementById('search-input')?.focus();
  }, [debouncedSearch]);

  return (
    <div className="position-relative">
      <div className="d-flex align-items-center">
        <IoSearch className="position-absolute ms-3" size={18} />
        <Form.Control
          id="search-input"
          type="text"
          value={query}
          onChange={handleChange}
          className="ps-5 py-2 rounded-pill"
          placeholder={placeholder}
          autoComplete="off"
          aria-label="Search"
        />
        {isSearching && (
          <Spinner 
            animation="border" 
            size="sm" 
            className="position-absolute end-0 me-5"
          />
        )}
        {query && !isSearching && (
          <Button
            variant="link"
            onClick={handleClear}
            className="position-absolute end-0 me-3 p-0"
            aria-label="Clear search"
          >
            <IoClose size={20} />
          </Button>
        )}
      </div>
    </div>
  );
});

SearchBar.displayName = 'SearchBar';

export { SearchBar };
export default SearchBar;