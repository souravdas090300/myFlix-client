import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { IoClose, IoSearch } from 'react-icons/io5';

const SearchBar = React.memo(({ 
  value = '',
  onSearchChange,
  placeholder = "Search...",
  debounceTime = 150
}) => {
  // Local input state with debounce to keep typing smooth and avoid heavy parent re-renders
  const inputRef = useRef(null);
  const [localValue, setLocalValue] = useState(value);
  const timeoutRef = useRef(null);

  // Sync when parent value changes, but only if the input isn't currently focused
  useEffect(() => {
    try {
      const el = inputRef.current;
      if (!el || document.activeElement !== el) {
        setLocalValue(value);
      }
    } catch (e) {
      setLocalValue(value);
    }
  }, [value]);

  // Debug: log mounts/unmounts to detect unexpected unmounting
  useEffect(() => {
    // console.debug can be removed once issue is resolved
    console.debug('[SearchBar] mounted');
    return () => console.debug('[SearchBar] unmounted');
  }, []);

  const triggerChange = useCallback((v) => {
    onSearchChange?.(v);
  }, [onSearchChange]);

  const handleChange = useCallback((e) => {
    const v = e.target.value;
    // capture caret position
    try {
      selectionRef.current.start = e.target.selectionStart;
      selectionRef.current.end = e.target.selectionEnd;
    } catch (e) {
      // ignore
    }
    setLocalValue(v);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => triggerChange(v), debounceTime);
  console.debug('[SearchBar] localValue change ->', v);
  }, [triggerChange, debounceTime]);

  const handleClear = useCallback(() => {
    clearTimeout(timeoutRef.current);
    setLocalValue('');
    triggerChange('');
    // keep focus in the input
    inputRef.current?.focus();
  console.debug('[SearchBar] cleared and focused');
  }, [triggerChange]);

  // No caret restoration — parent updates won't clobber local typing while input is focused.

  return (
    <div className="position-relative">
      <div className="d-flex align-items-center">
        <IoSearch className="position-absolute ms-3" size={18} />
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