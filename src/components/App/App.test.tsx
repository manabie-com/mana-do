import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { LOGIN_KEYS } from '../../models/auth';
import { AUTH_VALUE } from '../../resource/constant';

describe('App', () => {
  afterAll(() => {
    localStorage.clear();
  });

  it('should render sign in page without token', () => {
    const { getByText } = render(<App />);
    const signInBtn = getByText('Sign in', { selector: 'button' });

    expect(signInBtn).toBeTruthy();
  });

  it('should render todo page with token', () => {
    localStorage.setItem(LOGIN_KEYS.token, AUTH_VALUE.token);
    const { container } = render(<App />);
    const todoContainerDiv = container.querySelector('div');
    expect(todoContainerDiv.className).toMatch('ToDo__container');
  });
});
