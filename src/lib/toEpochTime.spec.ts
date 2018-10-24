import toEpochTime from './toEpochTime';

const TIMESTAMP = 1540404640379;

const date = new Date(TIMESTAMP);

it('converts epoch time to date', () => {
  const result = toEpochTime(date);
  expect(result).toEqual(TIMESTAMP);
});
