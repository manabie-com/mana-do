import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import SignInPage from './SignInPage';

describe('SignIn Page', () => {
  afterAll(() => {
    localStorage.clear();
  });

  it('should render sign in page', () => {
    const { container } = render(<SignInPage />);
    const signInContainerDiv = container.querySelector('div');
    expect(signInContainerDiv?.className).toMatch('sign-in-container');
  });

  it('should render form sign in page', () => {
    const onSubmit = jest.fn(() => {});
    const { container } = render(<SignInPage />);
    const form = container.querySelector('form');
    expect(form).toBeInTheDocument();
    if (form) {
      const userId = form.querySelector('#user_id');
      const password = form.querySelector('#password');
      if (userId && password) {
        fireEvent.change(userId, { target: { value: 'Good Day' } });
        fireEvent.change(password, { target: { value: 'Good Day' } });
      }
      const btn = form.querySelector('.action-btn-primary');
      btn && fireEvent.click(btn, {});
      fireEvent.submit(form, {
        target: { userId: 'Good Day', password: 'Good Day' },
      });
    }
  });
});
