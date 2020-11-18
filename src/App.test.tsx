import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom/extend-expect';

describe('App', () => {
  afterAll(() => {
    localStorage.clear()
  })
  it('should render sign in page', () => {
    localStorage.setItem('token', 'testabc.xyz.ahk')
    const { getByText } = render(<App />);
    const signInButton = getByText(/SIGN IN/i);

    expect(signInButton).toBeInTheDocument();
  });
})
