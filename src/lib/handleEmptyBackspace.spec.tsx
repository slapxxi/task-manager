import flow from 'lodash-es/flow';
import React from 'react';
import { fireEvent, render } from 'react-testing-library';
import { Keys } from '.';
import handleEmptyBackspace from './handleEmptyBackspace';

it('invokes callback when input is empty', () => {
  const spy = jest.fn();
  const { getByTestId } = render(
    <input type="text" onKeyDown={handleEmptyBackspace(spy)} data-testid="input" />,
  );
  fireEvent.keyDown(getByTestId('input'), {
    keyCode: Keys.backspace,
    target: { value: '' },
  });
  expect(spy).toHaveBeenCalledTimes(1);
});

it('does not invoke callback when input is not empty', () => {
  const spy = jest.fn();
  const { getByTestId } = render(
    <input type="text" onKeyDown={handleEmptyBackspace(spy)} data-testid="input" />,
  );
  fireEvent.keyDown(getByTestId('input'), {
    keyCode: Keys.backspace,
    target: { value: 'new' },
  });
  expect(spy).not.toHaveBeenCalled();
});

it('can be composed', () => {
  const results: string[] = [];
  const handlers = flow([
    handleEmptyBackspace(() => results.push('test')),
    (e) => results.push(e.currentTarget.value),
  ]);
  handlers({ keyCode: Keys.backspace, currentTarget: { value: '' } });
  expect(results).toEqual(['test', '']);
});
