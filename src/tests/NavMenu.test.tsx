import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { NavMenu } from '../components/header/NavMenu'
import { NavMenuItem } from '../components/header/NavMenuItem'

describe('NavMenuItem', () => {
  it('renders link with correct label to correct href', () => {
    render(
      <BrowserRouter>
        <NavMenuItem label="testLabel" to="testLink" />
      </BrowserRouter>
    )
    expect(screen.getByText('testLabel')).toBeInTheDocument()
    const linkDom = screen.getByText('testLabel')
    expect(linkDom).toHaveAttribute('href', '/testLink')
  })
})

describe('NavMenu', () => {
  const FakeNavMenuItem = <a href="menuItemLink">MenuItemTekst</a>
  render(
    <BrowserRouter>
      <NavMenu>{FakeNavMenuItem}</NavMenu>
    </BrowserRouter>
  )
  expect(screen.getByText(/MenuItemTekst/)).toBeInTheDocument()
})
