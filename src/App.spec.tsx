import React from 'react';
import { render } from 'react-testing-library';
import App from './App';

jest.mock('@local/components/IconSystem/IconSystem');
jest.mock('@local/services/fetchDatabase', () => () => null);
jest.mock('@local/services/saveDatabase', () => () => null);

it('renders', () => {
  expect(() => render(<App />)).not.toThrow();
});
