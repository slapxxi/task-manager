import React from 'react';
import { render } from 'react-testing-library';
import Icon from './Icon';

const glyph = { id: 'icon', viewBox: '0 0 10 10' };

it('renders icon with specified name', () => {
  const { container } = render(<Icon glyph={glyph} />);
  expect(container.firstChild).toMatchSnapshot();
});

it('accepts className', () => {
  const { container } = render(<Icon glyph={glyph} className="icon" />);
  expect(container.firstChild).toMatchSnapshot();
});

it('converts accepted theme to CSS variables', () => {
  const { container } = render(
    <Icon
      glyph={glyph}
      theme={{ primaryColor: 'red', secondaryColor: 'blue' }}
    />,
  );
  expect(container.firstChild).toMatchSnapshot();
});

it.each([['xsmall'], ['small'], ['medium'], ['large'], ['xlarge']])(
  'renders "%s" size',
  (size) => {
    const { container } = render(<Icon glyph={glyph} size={size} />);
    expect(container.firstChild).toMatchSnapshot();
  },
);
