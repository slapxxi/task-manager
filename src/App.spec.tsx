import React from 'react';
import { render } from 'react-testing-library';
import App from './App';

jest.mock('@local/components/IconSystem/IconSystem');

it('renders', () => {
  expect(() => render(<App />)).not.toThrow();
});
