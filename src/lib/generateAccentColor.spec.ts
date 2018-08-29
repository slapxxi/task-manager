import generateAccentColor from './generateAccentColor';

it('generates accent color for hex value', () => {
  const result = generateAccentColor('#000000');
  expect(result).toEqual('#262626');
});

it('generates accent color for keyword value', () => {
  const result = generateAccentColor('red');
  expect(result).toEqual('#e60000');
});

it('throws when color is invalid', () => {
  expect(() => generateAccentColor('')).toThrowError(
    // tslint:disable-next-line:quotemark
    "Couldn't parse the color string.",
  );
});
