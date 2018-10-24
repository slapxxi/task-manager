import fromEpochTime from './fromEpochTime';

const TIMESTAMP = 1540404640379;

const date = new Date(TIMESTAMP);

it('converts epoch time to date', () => {
  const result = fromEpochTime(TIMESTAMP);
  expect(result).toEqual(date);
});
