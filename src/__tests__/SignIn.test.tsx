

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SignInPage from '../pages/SignInPage';


test('pass valid User ID', () => {
  render(<SignInPage />);
  userEvent.type(screen.getByLabelText("User ID"), "firstUser");
  expect(screen.getByLabelText("User ID")).toHaveValue("firstUser");
});
test('Button SignIn', () => {
  render(<SignInPage />);
  const buttonEl = screen.getByText(/Sign in/i);
  userEvent.click(buttonEl);
});
test('pass valid Password', () => {
  render(<SignInPage />);
  userEvent.type(screen.getByLabelText("Password"), "example");
  expect(screen.getByLabelText("Password")).toHaveValue("example");
});