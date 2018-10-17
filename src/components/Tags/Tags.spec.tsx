import React from 'react';
import { render } from 'react-testing-library';
import Tags from './Tags';

const tags = [{ id: 'html', name: 'HTML' }, { id: 'css', name: 'CSS' }];

it('renders tags', () => {
  const { container } = render(
    <Tags tags={tags} renderTag={({ tag }) => <div>{tag.name}</div>} />,
  );
  expect(container.firstChild).toMatchSnapshot();
});
