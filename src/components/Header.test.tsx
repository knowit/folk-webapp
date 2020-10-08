// HEADER.test.tsx
import React from 'react'; 
import { render, screen } from '@testing-library/react'; 
import Header from './Header'; // component to test
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { useUserInfo } from '../LoginProvider';

const loginProviderMock = require('../LoginProvider');
const fakeUser = {name: "User Name", image: "fallback_user.svg"}
loginProviderMock.useUserInfo = jest.fn(()=>{return fakeUser});

it("renders without crashing", () =>{
  const div = document.createElement("div");
  ReactDOM.render(<BrowserRouter><Header /></BrowserRouter>,div)
})

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
    render(<BrowserRouter><Header /></BrowserRouter>);
    //Ensure the text is in the dom, will throw error it can't find
    const linkDom = screen.getByText(link.text); 
		
    //use jest assertion to verify the link property
    expect(linkDom).toHaveAttribute("href", link.location);
  }
);

test('Check if have logo and link to home page', () => {
    render(<BrowserRouter><Header /></BrowserRouter>);
    // get by TestId define in the navBar
    const logoDom = screen.getByTestId(/knowit-logo/); 
    // check the link location
    expect(logoDom).toHaveAttribute("href", "/"); 
    //check the logo image
  expect(screen.getByTitle(/knowit-logo/)).toBeInTheDocument(); 
});

describe("Header gets userInfo", () => {
  test("uses useUserInfo function", () =>{
    expect(useUserInfo).toHaveBeenCalled();
  })
  test('Check that userinfo is rendered correctly', () => {
    render(<BrowserRouter><Header /></BrowserRouter>);
    expect(screen.getByText(fakeUser.image)).toBeInTheDocument()
  });
})
