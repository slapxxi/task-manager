import React from 'react';
import { render } from 'react-testing-library';
import Compose from './Compose';

it('passes props down', () => {
  const spy = jest.fn(() => 'div');
  render(<Compose active>{({ active }) => spy(active)}</Compose>);
  expect(spy).toHaveBeenCalledTimes(1);
  expect(spy).toHaveBeenCalledWith(true);
});

it('works with refs', () => {
  const ref = React.createRef<HTMLElement>();
  render(
    <Compose forwardedRef={ref}>
      {({ forwardedRef }) => <span ref={forwardedRef}>hello</span>}
    </Compose>,
  );
  expect(ref.current!.innerHTML).toEqual('hello');
});
