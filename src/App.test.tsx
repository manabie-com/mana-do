import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import App from './App';
import React from 'react';

test('should render the main component without crashing', () => {
  render(<App />);
  const message = screen.getByText(/Check all completed todos/i);
  expect(message).toBeInTheDocument();
})
