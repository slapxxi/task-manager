import React from 'react';
import { fireEvent, render } from 'react-testing-library';
import Subtask from './Subtask';

const subtask = { id: 'test', description: 'test', completed: false };

it('renders', () => {
  const { container } = render(<Subtask subtask={subtask} />);
  expect(container.firstChild).toMatchSnapshot();
});

it('invokes callback when editing', () => {
  const spy = jest.fn();
  const { getByTestId } = render(<Subtask subtask={subtask} onEdit={spy} />);
  fireEvent.change(getByTestId('input'), { target: { value: 'new' } });
  expect(spy).toHaveBeenCalledWith({
    id: 'test',
    description: 'new',
    completed: false,
  });
});
