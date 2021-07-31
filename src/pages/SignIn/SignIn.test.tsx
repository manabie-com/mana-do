import React from 'react';
import { render, screen } from '@testing-library/react';
import SignInPage from './index';

it('should show sign in form', function () {
  render(<SignInPage />);
  expect(screen.getByText('Username')).toBeInTheDocument();
  expect(screen.getByText('Password')).toBeInTheDocument();
});
