import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

test('renders Ansatte link', async () => {
  render(<App />);
  await waitFor(() => {
    const linkElement = screen.getByText(/Ansatte/i); //Premade test; Changed from "/Hello World/i" to "/Ansatte/i" as there is no text with "Hello World" in the document
    expect(linkElement).toBeInTheDocument();
  });
});
