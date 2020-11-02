import React from 'react';
import { render, screen } from '@testing-library/react';
import CharacterLimitBox from './CharacterLimitBox';

describe('<CharacterLimitBox/>', () => {
  it("returns an element with title 'Data ikke tilgjengelig' text when given '-'", async () => {
    render(<CharacterLimitBox text="-" />);
    const textBox2 = screen.getByText('-');
    expect(textBox2).toHaveAttribute('title', 'Data ikke tilgjengelig');
  });

  it('returns an element without tooltip when characterLimit  is not reached', () => {
    render(
      <div style={{ width: '500px' }}>
        <CharacterLimitBox text="characterLimitBox testing" />
      </div>
    );
    const textBox2 = screen.getByText('characterLimitBox testing');
    expect(textBox2).not.toHaveAttribute('title', 'characterLimitBox testing');
  });
});

// Needs test for checking if it returns a tooltip when text overflows.
