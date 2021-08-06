import React from 'react';
import { render, screen } from '@testing-library/react';
import {createMemoryHistory} from 'history'
import App from './App';

test('renders learn react link', () => {
  const history = createMemoryHistory()

  render(<App />);
  expect(screen.getByText(/User id/i)).toBeInTheDocument()
});
