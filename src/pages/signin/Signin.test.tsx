import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Signin from './Signin';

const setup = () => {
  let wrapper = render(<Signin />);
  let loginInput = wrapper.getByRole('textbox', { name: 'User id' });
  let passwordInput = wrapper.getByPlaceholderText('Your password');
  let form = wrapper.getByTestId('form');
  return { loginInput, passwordInput, form, ...wrapper };
};

describe('<Signin />', () => {
  it('Can be submitted', () => {
    const { form, getByRole } = setup();
    const mockSubmit = jest.fn();
    form.onsubmit = mockSubmit;

    let submitBtn = getByRole('button', { name: 'Sign in' });
    submitBtn.click();

    expect(mockSubmit).toHaveBeenCalled();
  });

  it('Userid input can be changed', () => {
    let username = 'firstUser';
    const { loginInput } = setup();
    fireEvent.change(loginInput, { target: { value: username } });
    expect(loginInput).toHaveValue(username);
  });

  it('Password input can be changed', () => {
    let password = 'example';
    const { passwordInput } = setup();
    fireEvent.change(passwordInput, { target: { value: password } });
    expect(passwordInput).toHaveValue(password);
  });
});
