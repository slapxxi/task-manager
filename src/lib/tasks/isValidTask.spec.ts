import isValidTask from './isValidTask';

it('returns `false` if `title` is empty', () => {
  const result = isValidTask({ title: '' });
  expect(result).toEqual(false);
});
