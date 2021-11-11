import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';
import { MemoryRouter } from 'react-router-dom';
import { LOCAL_STORE, ROUTE } from '../shared/constant';

describe("Test App.tsx", () => {
  test('App render Sign In page initially', () => {
    const { getByText } = render(<App />);
    const txtManabie = getByText('Manabie');
    const txtPassword = getByText('Password');
    const txtUserId = getByText('User ID');
    const txtSignIn = getByText('Sign In');

    expect(txtManabie).toBeInTheDocument();
    expect(txtPassword).toBeInTheDocument();
    expect(txtUserId).toBeInTheDocument();
    expect(txtSignIn).toBeInTheDocument();
  });

  test("Go to TodoPage", () => {
    localStorage.setItem(LOCAL_STORE.TOKEN, "token");
    window.history.pushState({}, "", ROUTE.TODO_PAGE);
    const { getByText } = render(<App />, { wrapper: MemoryRouter });
    const text = getByText(/Clear all todos/i);
    expect(text).toBeInTheDocument();
  });
});