import React from 'react';
import { fireEvent, render } from 'react-testing-library';
import Tag from './Tag';

const tag = {
  id: 'test',
  name: 'test',
};

it('renders', () => {
  const { container } = render(<Tag tag={tag} selected={false} />);
  expect(container).toMatchSnapshot();
});

it('clicking does not change the attribute', () => {
  const { container, getByText } = render(<Tag tag={tag} selected={false} />);
  fireEvent.click(getByText('test'));
  expect(container).toMatchSnapshot();
});

it('invokes callback when label clicked', () => {
  const spy = jest.fn();
  const { getByText } = render(
    <Tag tag={tag} onSelect={spy} selected={false} />,
  );
  fireEvent.click(getByText('test'));
  expect(spy).toHaveBeenCalledTimes(1);
  expect(spy).toHaveBeenCalledWith(true, tag);
});

it('invokes callback when checkbox clicked', () => {
  const spy = jest.fn();
  const { getByTestId } = render(
    <Tag tag={tag} onSelect={spy} selected={false} />,
  );
  fireEvent.click(getByTestId('checkbox'));
  expect(spy).toHaveBeenCalledTimes(1);
  expect(spy).toHaveBeenCalledWith(true, tag);
});

it('invokes callback with correct value', () => {
  const spy = jest.fn();
  const { getByTestId } = render(<Tag tag={tag} onSelect={spy} selected />);
  fireEvent.click(getByTestId('checkbox'));
  expect(spy).toHaveBeenCalledTimes(1);
  expect(spy).toHaveBeenCalledWith(false, tag);
});
