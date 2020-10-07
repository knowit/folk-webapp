import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

test('renders Ansatte link', async () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  await waitFor(() => {
    const linkElement = screen.getByText(/Ansatte/i); //Premade test; Changed from "/Hello World/i" to "/Ansatte/i" as there is no text with "Hello World" in the document
    expect(linkElement).toBeInTheDocument();
  });
});
