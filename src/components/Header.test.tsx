// HEADER.test.tsx
import React from 'react'; 
import { render, screen } from '@testing-library/react'; 
import Header from './Header'; // component to test

const links = [
  { text: 'Ansatte', location: "/ansatte" },
  { text: 'Kunder', location: "/kunder" },
  { text: 'Kompetanse', location: "/kompetanse" },
  { text: 'Arbeidsmiljø', location: "/arbeidsmiljo" },
  { text: 'Rekruttering', location: "/rekruttering" },
];

// Use test.each to iterate the test cases above
test.each(links)(
  "Check if Nav Bar have %s link.",
  (link) => {
    render(<Header />);
    //Ensure the text is in the dom, will throw error it can't find
    const linkDom = screen.getByText(link.text); 
		
    //use jest assertion to verify the link property
    expect(linkDom).toHaveAttribute("href", link.location);
  }
);
test('Check if have logo and link to home page', () => {
    render(<Header />);
    // get by TestId define in the navBar
    const logoDom = screen.getByTestId(/knowit-logo/); 
    // check the link location
    expect(logoDom).toHaveAttribute("href", "/"); 
    //check the logo image
  expect(screen.getByTitle(/knowit-logo/)).toBeInTheDocument(); 
});
