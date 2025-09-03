import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { SearchBar } from './search-bar';

describe('SearchBar', () => {
  test('renders and accepts input', () => {
    const onSearchChange = vi.fn();

    render(<SearchBar onSearchChange={onSearchChange} />);

    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: 'matrix' } });

    // SearchBar is debounced; the input reflects typed value locally
    expect(input.value).toBe('matrix');
  });
});
