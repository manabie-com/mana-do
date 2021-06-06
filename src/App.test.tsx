import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders App element with className', () => {
  const { container } = render(<App />);
  expect(container.querySelector('main')).toHaveClass('App');
});
