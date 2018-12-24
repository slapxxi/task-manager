import React from 'react';
import { render } from 'react-testing-library';
import App from './App';

jest.mock('@local/components/IconSystem/IconSystem');
jest.mock('@local/hooks/useWorker');

it('renders', () => {
  expect(() => render(<App />)).not.toThrow();
});
