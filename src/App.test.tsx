import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Ansatte link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Ansatte/i);
  expect(linkElement).toBeInTheDocument();
});
