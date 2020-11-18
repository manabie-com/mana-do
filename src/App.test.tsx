import React from 'react';
// Updated @testing-library/react to version 11.1.2 due to a bug from its older versions
// For more information: https://github.com/testing-library/react-testing-library/issues/688
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
