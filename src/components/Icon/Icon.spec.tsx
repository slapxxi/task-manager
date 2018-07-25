import React from 'react';
import { render } from 'react-testing-library';
import Icon from './Icon';

it('renders icon with specified name', () => {
  const { container } = render(
    <Icon glyph={{ id: 'icon', viewBox: '0 0 10 10' }} />,
  );
  expect(container.firstChild).toMatchSnapshot();
});
