import themeToCSSVariables from './themeToCSSVariables';

it('converts theme to CSS variables', () => {
  const result = themeToCSSVariables({
    primaryColor: 'red',
    secondaryColor: 'green',
  });
  expect(result).toEqual('--primary-color: red; --secondary-color: green;');
});
