import React from 'react';
import { Router, BrowserRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { screen, render } from '@testing-library/react';

import App from './App';
import {mockToken} from "./service/api-frontend";
import {ROUTES} from "./utils/constants";

const renderWithRouter = (ui: any, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return render(ui, { wrapper: BrowserRouter });
}

test('full app rendering /sign-in page', () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <App />
    </Router>
  )
  expect(screen.getByText(/Login with Google/i)).toBeInTheDocument()
  expect(screen.getByText(/Login with Facebook/i)).toBeInTheDocument()
  expect(screen.getByText(/Username:/i)).toBeInTheDocument()
  expect(screen.getByText(/Password:/i)).toBeInTheDocument()
  expect(screen.getByText(/Remember me/i)).toBeInTheDocument()
  expect(screen.getByText(/Forgot Password?/i)).toBeInTheDocument()
  expect(screen.getByText(/Sign in/i)).toBeInTheDocument()
  expect(screen.getByText(/Don’t have an account?/i)).toBeInTheDocument()
});

test('full app rendering /todo page', () => {
  localStorage.setItem('token', mockToken);
  renderWithRouter(<App />, {route: ROUTES.TODO});
  expect(screen.getByText(/Logout/i)).toBeInTheDocument();
  expect(screen.getByText(/ACTIVE/i)).toBeInTheDocument();
  expect(screen.getByText(/COMPLETED/i)).toBeInTheDocument();
  expect(screen.getByText(/Clear all todos/i)).toBeInTheDocument();
});
