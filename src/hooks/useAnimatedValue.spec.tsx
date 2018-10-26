import React from 'react';
import { fireEvent, render, wait } from 'react-testing-library';
import useAnimatedValue from './useAnimatedValue';

jest.useFakeTimers();

function Subject({ render: r }: any) {
  const [animatedValue, setAnimatedValue] = useAnimatedValue(0);

  function handleClick() {
    setAnimatedValue(10);
  }

  return (
    <button onClick={handleClick} data-testid="animate">
      {r(animatedValue)}
    </button>
  );
}

it('animates value', async () => {
  const spy = jest.fn((value) => <div>{value}</div>);
  const { getByTestId } = render(<Subject render={spy} />);
  fireEvent.click(getByTestId('animate'));
  await wait(() => expect(spy.mock.calls.length).toBeGreaterThan(10));
});

it('animates to final value', async () => {
  const spy = jest.fn((value) => <div>{value}</div>);
  const { getByTestId } = render(<Subject render={spy} />);
  const animateButton = getByTestId('animate');
  fireEvent.click(animateButton);
  await wait(() => expect(animateButton.innerHTML).toEqual('<div>10</div>'));
});
