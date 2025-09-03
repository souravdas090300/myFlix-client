import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MainView } from './main-view';

describe('MainView smoke', () => {
  test('renders without crashing', () => {
    render(
      <MemoryRouter>
        <MainView />
      </MemoryRouter>
    );

  // Expect navigation (unauthenticated) to show login route or signup
  const loginMatches = screen.queryAllByText(/login/i);
  const signupMatches = screen.queryAllByText(/sign up/i);
  expect(loginMatches.length + signupMatches.length).toBeGreaterThan(0);
  });
});
