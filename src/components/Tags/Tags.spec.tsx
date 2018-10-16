import React from 'react';
import { fireEvent, render } from 'react-testing-library';
import Keys from '../../lib/keys';
import Tags from './Tags';

const tags = [{ id: 'html', name: 'HTML' }, { id: 'css', name: 'CSS' }];

it('renders tags', () => {
  const { getByTestId } = render(<Tags tags={tags} />);
  const parent = getByTestId('tags');
  expect((parent.firstChild as Node).textContent).toEqual('HTML');
  expect((parent.lastChild as Node).textContent).toEqual('CSS');
});

it('calls `onAddTag` when tag added', () => {
  const spy = jest.fn();
  const { getByTestId } = render(<Tags tags={tags} onAddTag={spy} />);
  const input = getByTestId('input');
  fireEvent.change(input, { target: { value: 'new' } });
  fireEvent.keyDown(input, { keyCode: Keys.enter });
  expect(spy).toHaveBeenCalledWith({ name: 'new' });
  expect((input as HTMLInputElement).value).toEqual('');
});

it('does not call `onAddTag` when tag invalid', () => {
  const spy = jest.fn();
  const { getByTestId } = render(<Tags tags={tags} onAddTag={spy} />);
  const input = getByTestId('input');
  fireEvent.change(input, { target: { value: ' ' } });
  fireEvent.keyDown(input, { keyCode: Keys.enter });
  expect(spy).not.toHaveBeenCalled();
  expect((input as HTMLInputElement).value).toEqual(' ');
});
