import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { IoClose, IoSearch } from 'react-icons/io5';

const SearchBar = React.memo(({ 
  onSearchChange,
  placeholder = "Search...",
  debounceTime = 500
}) => {
  // Local input state with debounce to keep typing smooth and avoid heavy parent re-renders
  const inputRef = useRef(null);
  const [localValue, setLocalValue] = useState('');
  const timeoutRef = useRef(null);
  // ensure timeout cleared on unmount
  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  // Optional debug: enable by setting window.__DEBUG_SEARCHBAR = true in dev tools
  useEffect(() => {
    if (window?.__DEBUG_SEARCHBAR) {
      // eslint-disable-next-line no-console
      console.debug('[SearchBar] mounted');
      return () => console.debug('[SearchBar] unmounted');
    }
    return undefined;
  }, []);

  const triggerChange = useCallback((v) => {
    onSearchChange?.(v);
  }, [onSearchChange]);

  const handleChange = useCallback((e) => {
    const v = e.target.value;
    setLocalValue(v);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => triggerChange(v), debounceTime);
  if (window?.__DEBUG_SEARCHBAR) {
    // eslint-disable-next-line no-console
    console.debug('[SearchBar] localValue change ->', v);
  }
  }, [triggerChange, debounceTime]);

  const handleClear = useCallback(() => {
    clearTimeout(timeoutRef.current);
    setLocalValue('');
    triggerChange('');
    // keep focus in the input
    inputRef.current?.focus();
    if (window?.__DEBUG_SEARCHBAR) {
      // eslint-disable-next-line no-console
      console.debug('[SearchBar] cleared and focused');
    }
  }, [triggerChange]);

  // No caret restoration — parent updates won't clobber local typing while input is focused.

  return (
    <div className="position-relative" onClick={() => inputRef.current?.focus()}>
      <div className="d-flex align-items-center">
        {/* Make icon non-interactive so clicks reach the input */}
        <IoSearch className="position-absolute ms-3" size={18} style={{ pointerEvents: 'none' }} />
        <Form.Control
          id="search-input"
          ref={inputRef}
          type="text"
          value={localValue}
          onChange={handleChange}
          className="ps-5 py-2 rounded-pill"
          placeholder={placeholder}
          autoComplete="off"
          aria-label="Search"
        />
        {localValue && (
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
