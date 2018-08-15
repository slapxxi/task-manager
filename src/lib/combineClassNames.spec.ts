import combineClassNames from './combineClassNames';

it('combines class names', () => {
  const result = combineClassNames('first', 'second');
  expect(result).toEqual('first second');
});

it('removes duplicates', () => {
  const result = combineClassNames('first', 'first');
  expect(result).toEqual('first');
});

it('ignores undefined values', () => {
  const result = combineClassNames('first', undefined, 'second');
  expect(result).toEqual('first second');
});
