import React from 'react';
import { fireEvent, render } from 'react-testing-library';
import Keys from '../../lib/keys';
import Tags from './Tags';

const tags = [{ id: 'html', name: 'HTML' }, { id: 'css', name: 'CSS' }];
const updater = jest.fn();

beforeEach(() => {
  updater.mockClear();
});

it('renders tags', () => {
  const { getByTestId } = render(<Tags tags={tags} />);
  const parent = getByTestId('tags');
  expect((parent.firstChild as Node).textContent).toEqual('HTML');
  expect((parent.lastChild as Node).textContent).toEqual('CSS');
});

it('calls `onAddTag` when tag added', () => {
  const { getByTestId } = render(<Tags tags={tags} onAddTag={updater} />);
  const input = getByTestId('input');
  fireEvent.change(input, { target: { value: 'new' } });
  fireEvent.keyDown(input, { keyCode: Keys.enter });
  expect(updater).toHaveBeenCalledWith('new');
  expect((input as HTMLInputElement).value).toEqual('');
});

it('does not call `onAddTag` when tag invalid', () => {
  const { getByTestId } = render(<Tags tags={tags} onAddTag={updater} />);
  const input = getByTestId('input');
  fireEvent.change(input, { target: { value: ' ' } });
  fireEvent.keyDown(input, { keyCode: Keys.enter });
  expect(updater).not.toHaveBeenCalled();
  expect((input as HTMLInputElement).value).toEqual(' ');
});
